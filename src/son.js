var BlockParser, SON, c;

c = console;

BlockParser = {
  tokenizeIndents: function(str) {
    var chr, col, curIndentLevel, i, indentChange, indentChr, indentLevels, level, line, lineNum, prevIndentLevel, tokens, trimmed, _i, _j, _k, _len, _len1, _ref, _ref1;
    indentChr = null;
    prevIndentLevel = null;
    curIndentLevel = null;
    indentLevels = [];
    tokens = [];
    _ref = str.split("\n");
    for (lineNum = _i = 0, _len = _ref.length; _i < _len; lineNum = ++_i) {
      line = _ref[lineNum];
      lineNum += 1;
      trimmed = $.trim(line);
      if (trimmed === "") {
        continue;
      }
      curIndentLevel = 0;
      for (col = _j = 0, _len1 = line.length; _j < _len1; col = ++_j) {
        chr = line[col];
        if (chr === " " || chr === "\t") {
          curIndentLevel += 1;
          if (indentChr === null) {
            indentChr = chr;
          } else if (indentChr !== chr) {
            throw new Error("BlockParser: inconsistent indentation character. Choose either tabs or spaces. Line:" + lineNum);
          }
        } else {
          if (prevIndentLevel === null) {
            prevIndentLevel = curIndentLevel;
            indentLevels.push(curIndentLevel);
          }
          indentChange = curIndentLevel - prevIndentLevel;
          if (indentChange > 0) {
            indentLevels.push(curIndentLevel);
            tokens.push({
              type: 'INDENT',
              lineNum: lineNum,
              val: line.substr(prevIndentLevel, indentChange)
            });
          } else if (indentChange < 0) {
            i = indentLevels.length - 1;
            while (true) {
              if (i < 0) {
                throw new Error("Invalid indentationLevel:" + curIndentLevel + " . Dedentation lower than base. Line:" + lineNum);
              }
              level = indentLevels[i];
              if (curIndentLevel < level) {
                indentLevels.pop();
                tokens.push({
                  type: 'DEDENT',
                  lineNum: lineNum,
                  level: indentLevels.slice()
                });
                --i;
              } else if (curIndentLevel > level) {
                throw new Error("Invalid indentationLevel:" + curIndentLevel + " . Dedentation misaligned. Line:" + lineNum);
              } else {
                break;
              }
            }
          }
          tokens.push({
            type: 'LINE',
            lineNum: lineNum,
            val: trimmed
          });
          prevIndentLevel = curIndentLevel;
          break;
        }
      }
    }
    if (indentLevels.length > 0) {
      for (i = _k = 0, _ref1 = indentLevels.length - 1; _k < _ref1; i = _k += 1) {
        tokens.push({
          type: 'DEDENT',
          lineNum: lineNum
        });
      }
    }
    tokens.push({
      type: 'EOF'
    });
    return tokens;
  },
  parseBlocks: function(lineTokens) {
    var consume, index, parseBlock, peek, rootBlock;
    rootBlock = {
      blocks: []
    };
    index = 0;
    peek = function() {
      return lineTokens[index];
    };
    consume = function() {
      return index++;
    };
    parseBlock = function(parentBlock) {
      var block, token;
      while (true) {
        token = peek();
        if (token.type === 'EOF') {
          break;
        }
        switch (token.type) {
          case 'LINE':
            consume();
            block = {
              line: token.val,
              lineNum: token.lineNum
            };
            parentBlock.blocks.push(block);
            break;
          case 'INDENT':
            consume();
            if (!block.blocks) {
              block.blocks = [];
            }
            block = parseBlock(block);
            break;
          case 'DEDENT':
            consume();
            return parentBlock;
        }
      }
      return parentBlock;
    };
    rootBlock = parseBlock({
      line: "",
      blocks: []
    });
    return rootBlock;
  },
  parse: function(str) {
    var blockTree, lineTokens;
    lineTokens = this.tokenizeIndents(str);
    blockTree = this.parseBlocks(lineTokens);
    return blockTree;
  }
};

SON = (function() {
  function SON() {}

  SON.regexes = {
    word: "\"(?:[^\\\\]*(?:\\\\.)?)*\"|'(?:[^\\\\]*(?:\\\\.)?)*'|\\S+"
  };

  SON.parseObject = function(tree) {
    var block, line, matches, obj, prop, table, val, _i, _len, _ref;
    if (!(tree && tree.blocks)) {
      return null;
    }
    obj = {};
    _ref = tree.blocks;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      block = _ref[_i];
      line = block.line;
      if (line.substr(0, 2) === "//") {
        continue;
      }
      matches = line.match(/^(\S+)\:?(?:\s+(.*))?/);
      prop = matches[1];
      val = matches[2];
      if (val === void 0) {
        val = this.parseObject(block);
      } else if (val === '*') {
        val = this.parseArray(block);
      } else if (val === '*-') {
        val = this.parseArray(block, table = true);
      }
      obj[prop] = val;
    }
    return obj;
  };

  SON.parseArray = function(tree, table, grid) {
    var arr, block, elems, header, headers, i, line, sepRegexp, _i, _j, _len, _len1, _ref;
    if (table == null) {
      table = false;
    }
    if (grid == null) {
      grid = false;
    }
    arr = [];
    headers = null;
    sepRegexp = new RegExp(this.regexes.word, 'g');
    if (tree && tree.blocks) {
      _ref = tree.blocks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        block = _ref[_i];
        line = block.line;
        if (line.substr(0, 2) === "//") {
          continue;
        }
        if (table) {
          elems = line.match(sepRegexp);
          if (!headers) {
            headers = elems;
            continue;
          } else {
            line = {};
            for (i = _j = 0, _len1 = headers.length; _j < _len1; i = ++_j) {
              header = headers[i];
              line[header] = elems[i];
            }
          }
        } else if (line === "-") {
          line = this.parseObject(block);
        }
        arr.push(line);
      }
    }
    return arr;
  };

  SON.parse = function(str) {
    var data, tree;
    tree = BlockParser.parse(str);
    data = this.parseObject(tree);
    return data;
  };

  SON.dump = function(object) {
    return c.log(object);
  };

  SON.tabs = function(numTabs) {
    var i, str, _i;
    str = "";
    for (i = _i = 0; _i < numTabs; i = _i += 1) {
      str += "\t";
    }
    return str;
  };

  return SON;

})();

c.log('ready');
