c = console

class BlockParser
	## TODO, make this work for spaced indents as well
	@tokenizeIndents: (str) ->
		prevIndent = 0
		baseIndent = -1
		tokens = []

		#TODO: optimize this for single character look ahead
		for line, lineNum in str.split("\n")
			if $.trim(line) == "" then continue

			indents = 0
			for chr, index in line
				if chr == "\t" then indents += 1 
				else
					indentChange = indents - prevIndent
					prevIndent = indents

					if indentChange > 0
						tokens.push(type:'indent', lineNum: lineNum)
					else if indentChange < 0
						for i in [0...-indentChange]
							tokens.push(type:'dedent', lineNum: lineNum)
					
					tokens.push(type: 'line', lineNum: lineNum, val: $.trim(line.substr(index)))
					break;

		if prevIndent > 0
			for i in [0...prevIndent]
				tokens.push(type:'dedent')

		tokens.push(type:'eof')

		return tokens

	@parseBlocks: (lineTokens) ->
		rootBlock = {blocks:[]}
		index = 0

		peek = -> lineTokens[index]
		consume = -> index++


		parseBlock = (parentBlock) ->
			while true
				token = peek()
				if token.type == 'eof' then break

				switch token.type
					when 'line'
						consume()
						block = {line: token.val, lineNum: token.lineNum}
						parentBlock.blocks.push(block)

					when 'indent'
						consume()
						if not block.blocks then block.blocks = []
						block = parseBlock(block)

					when 'dedent'
						consume()
						return parentBlock

			return parentBlock


		rootBlock = parseBlock({line:"", blocks:[]})
		return rootBlock

	@parse: (str) ->
		lineTokens = @tokenizeIndents(str)
		blockTree = @parseBlocks(lineTokens)
		return blockTree


class SON
	@helpers: ->
		tabs = (numTabs) ->
			str = ""
			(str += "\t" for i in [0...numTabs] by 1)
			return str

		for token, i in tokens
			if token.type == 'indent'
				outStr.push("{\n")
				indentLevel += token.val

			if token.type == 'dedent'

				for i in [1..token.val] by 1
					indentLevel--
					outStr.push(tabs(indentLevel) + "}\n")
			
			else if token.type == 'line'
				line = tabs(indentLevel) + token.val

				if i + 1< tokens.length and tokens[i + 1].type != 'indent'
					line += ";\n"
				outStr.push(line)

		
		return outStr.join("")

	@parseObject: (tree) ->
		if not (tree and tree.blocks) then return null

		obj = {}
		for block in tree.blocks
			line = block.line
			matches = line.match(/(\w+)(\s+(.*))?/)
			prop = matches[1]
			val = matches[3]

			switch val
				when undefined then val = @parseObject(block)
				when '*' then val = @parseArray(block)

			obj[prop] = val

		return obj

	@parseArray: (tree) ->
		arr = []

		if tree and tree.blocks
			for block in tree.blocks
				line = block.line

				arr.push(line)
		return arr

	@parse: (str) ->
		tree = BlockParser.parse(str)
		data = @parseObject(tree)
		c.log(tree)

		return data

	@dump: (object) ->
		c.log(object)

c.log 'ready'