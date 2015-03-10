c = console

BlockParser =
	## TODO, make this work for spaced indents as well
	tokenizeIndents: (str) ->
		prevIndent = 0
		curIndent = 0
		indentLevels = []
		indentChr = null
		tokens = []


		#TODO: optimize this for single character look ahead
		for line, lineNum in str.split("\n")
			lineNum += 1
			trimmed = $.trim(line)

			if trimmed == ""
				#tokens.push(type: 'LINE', lineNum: lineNum, val: trimmed)
				continue

			curIndent = 0
			for chr, col in line
				if chr == " " || chr == "\t"
					if indentChr and indentChr != chr
						throw new Error("BlockParser: inconsistent indentation character. Choose either tabs or spaces. Line:" + lineNum)
					else
						indentChr = chr
						curIndent += 1

				else
					if curIndent > prevIndent
						indentLevels.push(curIndent)

						# first indentLevel is used as base
						if indentLevels.length > 1
							tokens.push(type:'INDENT', lineNum: lineNum, level: indentLevels.slice())

					else if curIndent < prevIndent

						for level in indentLevels by -1
							if level > curIndent
								indentLevels.pop() 
								tokens.push(type:'DEDENT', lineNum: lineNum, level: indentLevels.slice())

							else if level == curIndent
								break

							else
								throw new Error("Invalid indentationLevel:" + curIndent + " . Ensure indent alignment. Line:" + lineNum)
					
					tokens.push(type: 'LINE', lineNum: lineNum, val: trimmed)
					prevIndent = curIndent
					break;

		if indentLevels.length > 0
			for i in [0...indentLevels.length - 1] by 1
				tokens.push(type:'DEDENT', lineNum: lineNum)

		tokens.push(type:'EOF')

		return tokens

	parseBlocks: (lineTokens) ->
		rootBlock = {blocks:[]}
		index = 0

		peek = -> lineTokens[index]
		consume = -> index++


		parseBlock = (parentBlock) ->
			while true
				token = peek()
				if token.type == 'EOF' then break

				switch token.type
					when 'LINE'
						consume()
						block = {line: token.val, lineNum: token.lineNum}
						parentBlock.blocks.push(block)

					when 'INDENT'
						consume()
						if not block.blocks then block.blocks = []
						block = parseBlock(block)

					when 'DEDENT'
						consume()
						return parentBlock

			return parentBlock


		rootBlock = parseBlock({line:"", blocks:[]})
		return rootBlock

	parse: (str) ->
		lineTokens = @tokenizeIndents(str)
		#console.log(lineTokens)
		#return lineTokens
		blockTree = @parseBlocks(lineTokens)
		return blockTree


class SON
	@regexes:
		word: "\"(?:[^\\\\]*(?:\\\\.)?)*\"|'(?:[^\\\\]*(?:\\\\.)?)*'|\\S+"

	@parseObject: (tree) ->
		if not (tree and tree.blocks) then return null

		obj = {}
		for block in tree.blocks
			line = block.line

			if line.substr(0,2) == "//" then continue

			# todo - handle one liners
			matches = line.match(/^(\S+)\:?(?:\s+(.*))?/)
			prop = matches[1]
			val = matches[2]

			if val == undefined then val = @parseObject(block)
			else if val == '*' then val = @parseArray(block)
			else if val == '*-' then val = @parseArray(block, table = true)

			obj[prop] = val

		return obj

	@parseArray: (tree, table = false, grid = false) ->
		arr = []

		headers = null
		sepRegexp = new RegExp(@regexes.word, 'g')


		if tree and tree.blocks
			for block in tree.blocks
				line = block.line

				if line.substr(0,2) == "//" then continue

				if table 
					elems = line.match(sepRegexp)

					if not headers
						headers = elems
						continue
					else 
						# do length check
						line = {}
						for header, i in headers
							line[header] = elems[i]

				else if line == "-" then line = @parseObject(block)

				arr.push(line)
		return arr

	@parse: (str) ->
		tree = BlockParser.parse(str)
		data = @parseObject(tree)
		#c.log(tree)
		#return tree
		return data


	@dump: (object) ->
		# TODO Implement dumper
		c.log(object)

	@tabs: (numTabs) ->
		str = ""
		(str += "\t" for i in [0...numTabs] by 1)
		return str

c.log 'ready'

