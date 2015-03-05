c = console

$ ->
	$.ajax
		url: 'data/resume.son'
		#url: 'son.coffee'
		success : (data) ->
			$("#in").text data
			blocks = BlockParser.parseBlocks(data)
			$("#out").text JSON.stringify(blocks, null, 4)


class BlockParser
	@tokenizeIndents: (str) ->
		prevIndent = 0
		baseIndent = -1
		tokens = []

		for line, lineNum in str.split("\n")
			if $.trim(line) == "" then continue

			indents = 0
			for chr, index in line
				if chr == "\t" then indents += 1 
				else
					indentChange = indents - prevIndent
					prevIndent = indents

					if indentChange > 0
						tokens.push(type:'indent')
					else if indentChange < 0
						for i in [0...-indentChange]
							tokens.push(type:'dedent')
					
					tokens.push(type: 'line', val: $.trim(line.substr(index)))
					break;

		if prevIndent > 0
			for i in [0...prevIndent]
				tokens.push(type:'dedent')

		tokens.push(type:'eof')

		return tokens

	@parseBlocks: (str) ->
		tokens = @tokenizeIndents(str)

		rootBlock = {blocks:[]}
		index = 0

		peek = -> tokens[index]
		consume = -> index++;  tokens[index-1]


		parseBlock = (parentBlock) ->
			while true
				token = peek()
				if token.type == 'eof' then break

				switch token.type
					when 'line'
						consume()
						block = {line: token.val}
						parentBlock.blocks.push(block)

					when 'indent'
						consume()
						if not block.blocks then block.blocks = []
						block = parseBlock(block)

					when 'dedent'
						consume()
						return parentBlock

			return parentBlock


		rootBlock = parseBlock({blocks:[]})
		return rootBlock




class SON
	inoutdent: (str) ->
		indentLevel = 0
		tokens = []

		for line in str.split("\n")
			if $.trim(line) == "" then continue
			numIndents = 0

			for chr, index in line
				if chr == "\t" then numIndents += 1 
				else
					indentChange = numIndents - indentLevel
					indentLevel = numIndents

					if indentChange > 0
						tokens.push(type:'indent', val: indentChange)
					else if indentChange < 0
						tokens.push(type:'dedent', val: -indentChange)
					

					tokens.push(type: 'line', val: $.trim(line.substr(index)))
					break;

		if indentLevel > 0
			tokens.push(type:'dedent', val: indentLevel)

		indentLevel = 0
		outStr = []

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


	@parse: (str) ->
		son = new SON
		return son.inoutdent(str)

	@dump: (object) ->
		c.log(object)

c.log 'ready'
