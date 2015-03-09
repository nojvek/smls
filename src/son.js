var BlockParser, SON, c;

c = console;

BlockParser = (function() {
  function BlockParser() {}

  BlockParser.tokenizeIndents = function(str) {
    var baseIndent, chr, i, indentChange, indents, index, line, lineNum, prevIndent, tokens, _i, _j, _k, _l, _len, _len1, _ref;
    prevIndent = 0;
    baseIndent = -1;
    tokens = [];
    _ref = str.split("\n");
    for (lineNum = _i = 0, _len = _ref.length; _i < _len; lineNum = ++_i) {
      line = _ref[lineNum];
      if ($.trim(line) === "") {
        continue;
      }
      indents = 0;
      for (index = _j = 0, _len1 = line.length; _j < _len1; index = ++_j) {
        chr = line[index];
        if (chr === "\t") {
          indents += 1;
        } else {
          indentChange = indents - prevIndent;
          prevIndent = indents;
          if (indentChange > 0) {
            tokens.push({
              type: 'indent',
              lineNum: lineNum
            });
          } else if (indentChange < 0) {
            for (i = _k = 0; 0 <= -indentChange ? _k < -indentChange : _k > -indentChange; i = 0 <= -indentChange ? ++_k : --_k) {
              tokens.push({
                type: 'dedent',
                lineNum: lineNum
              });
            }
          }
          tokens.push({
            type: 'line',
            lineNum: lineNum,
            val: $.trim(line.substr(index))
          });
          break;
        }
      }
    }
    if (prevIndent > 0) {
      for (i = _l = 0; 0 <= prevIndent ? _l < prevIndent : _l > prevIndent; i = 0 <= prevIndent ? ++_l : --_l) {
        tokens.push({
          type: 'dedent'
        });
      }
    }
    tokens.push({
      type: 'eof'
    });
    return tokens;
  };

  BlockParser.parseBlocks = function(lineTokens) {
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
        if (token.type === 'eof') {
          break;
        }
        switch (token.type) {
          case 'line':
            consume();
            block = {
              line: token.val,
              lineNum: token.lineNum
            };
            parentBlock.blocks.push(block);
            break;
          case 'indent':
            consume();
            if (!block.blocks) {
              block.blocks = [];
            }
            block = parseBlock(block);
            break;
          case 'dedent':
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
  };

  BlockParser.parse = function(str) {
    var blockTree, lineTokens;
    lineTokens = this.tokenizeIndents(str);
    blockTree = this.parseBlocks(lineTokens);
    return blockTree;
  };

  return BlockParser;

})();

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
    c.log(tree);
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
