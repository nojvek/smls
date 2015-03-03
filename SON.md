SON (Simple Object Notation)
============================

This is a sample JSON file

```
{"firstName":"John","lastName":"Smith","isAlive":true,"age":25,"height_cm":167.6,"address":{"street":"21 2nd Street","city":"New York","state":"NY","postalCode":"10021-3100"},"phoneNumbers":[{"type":"home","number":"212 555-1234"},{"type":"office","number":"646 555-4567"},{"type":"cell","number":"425 999-1234"}],"children":["Pete","Bob","Rebecca","Alicia"],"schedule":[{"time":"8pm","event":"Pete's birthday party"},{"time":"4pm","event":"meet Gibson"},{"time":"9pm","event":"Date with Laura"}],"achievements":["1st Position, 2008 Blind Coding","2nd Position, 2015 Ninja Debugger","1st Position, 2014 Human Compiler : This dude writes assembly"],"daysFree":[["mon","tue","wed","thu","fri","sat","sun"],[0,0,0,1,1,0,0],[0,1,0,1,1,0,0],[0,1,0,0,0,0,0],[0,1,1,1,1,0,0]]}
```

Not very readable by us humans. We visualize structures with indentation and whitespace. JSON uses curly and square brackets to understand object structure. It ignores whitespace.

Below is a handwritten json file. While writing it took 4 validation cycles before I got the syntax all correct. Its so easy to miss characters such as ",:'}]". That's a lot of brain cycles wasted!

```
 { 
    "firstName": "John",
    "lastName": "Smith",
    "isAlive": true,
    "age": 25,
    "height_cm": 167.6,
    "address": {
        "street": "21 2nd Street",
        "city": "New York",
        "state": "NY",
        "postalCode": "10021-3100"
    },
    "phoneNumbers": [
        {
            "type": "home",
            "number": "212 555-1234"
        },
        {
            "type": "office",
            "number": "646 555-4567"
        },
        {
            "type": "cell",
            "number": "425 999-1234"
        }        
    ],
    "children": [
        "Pete",
        "Bob",
        "Rebecca",
        "Alicia"
    ],
    "schedule": [
        {
            "time": "8pm",
            "event": "Pete's birthday party"
        },
        {
            "time": "4pm",
            "event": "meet Gibson"
        },
        {
            "time": "9pm",
            "event": "Date with Laura"
        }  
    ],
    "achievements": [
        "1st Position, 2008 Blind Coding",
        "2nd Position, 2015 Ninja Debugger",
        "1st Position, 2014 Human Compiler : This dude writes assembly"
    ],
    "daysFree": [
        ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
        [0,0,0,1,1,0,0],
        [0,1,0,1,1,0,0],
        [0,1,0,0,0,0,0],
        [0,1,1,1,1,0,0],
    ]
}
```

Let's say 4 spaces or tab denotes an indent. From indentation we can determine structure. Let's go ahead and remove all syntax characters except start of arrays and objects.

```
{
firstName John
lastName Smith
isAlive true
age 25
height_cm 167.6
address {
    street 21 2nd Street
    city New York
    state NY
    postalCode 10021-3100

phoneNumbers [
	{
        type home
        number 212 555-1234
    {
        type office
        number 646 555-4567
    {
        type cell
        number 425 999-1234
            
children [
    Pete
    Bob
    Rebecca
    Alicia

schedule [
	{
        time 8pm
        event Pete's birthday party
    {
        time 4pm
        event meet Gibson
    {
        time 9pm
        event Date with Laura
      

achievements [
    1st Position 2008 Blind Coding
    2nd Position 2015 Ninja Debugger
    1st Position 2014 Human Compiler (This dude writes assembly)

daysFree [
    [mon tue wed thu fri sat sun
    [0 0 0 1 1 0 0
    [0 1 0 1 1 0 0
    [0 1 0 0 0 0 0
    [0 1 1 1 1 0 0
```

### Basics

* Pretty cool aye! the '{' and '[' look awkward. Let's use '-' to indicate start of new object. '*' (many spikes) to indicate start of array. 
* The first word is property and everything after that is either a string, number, null or true/false.
* If we're in an array then the whole line is used as a value. Also let's drop the '-' to indicate object of object.

```
firstName John
lastName Smith
isAlive true
age 25
height_cm 167.6
address 
    street 21 2nd Street
    city New York
    state NY
    postalCode 10021-3100

phoneNumbers *
	-
        type home
        number 212-555-1234
    -
        type office
        number 646-555-4567
    -
        type cell
        number 425-999-1234
            
children *
    Pete
    Bob
    Rebecca
    Alicia

schedule *
	-
        time 8pm
        event Pete's birthday party don't forget gifts
    -
        time 4pm
        event meet Gibson
    -
        time 9pm
        event Date with Laura, buy flowers
      

achievements *
    1st Position 2008 Blind Coding
    2nd Position 2015 Ninja Debugger
    1st Position 2014 Human Compiler (This dude writes assembly)

daysFree *
    * mon tue wed thu fri sat sun
    * 0 0 0 1 1 0 0
    * 0 1 0 1 1 0 0
    * 0 1 0 0 0 0 0
    * 0 1 1 1 1 0 0
```

### List of lists and tables

Let's add some sugar to add comma delimited lists and space limited lists.

* ',' or '|' can be use to indicate how to delmit a list after '\*'
* '\*,' for comma separated list. '\*|' for pipe separated list.
* '\*-' for list of objects as table
* '\**' for list of lists

Examples :
```
* a b c d 		-> ['a', 'b', 'c', 'd']
*, a,b,c,d 		-> ['a', 'b', 'c', 'd']
*| a | b |c | d -> ['a', 'b', 'c', 'd']


**	a b c d		-> [['a', 'b', 'c', 'd'],
	e f g h		->  ['e', 'f', 'g', 'h'],
	i j k l		->  ['i', 'j', 'k', 'l']]

**, a A, b B, c C, d D	-> [['a A', 'b B', 'c C', 'd D'],
	d D, e E, f F, g G		['d D', 'e E', 'f F', 'g G'],
	h H, i I, j J, k K		['h H', 'i I', 'j J', 'k K']]

*-	key1	key2		-> [{"key1":"val1", "key2":"val2"},
	val1	val2			{"key1":"val3", "key2":"val4"},
	val3	val4			{"key1":"val5", "key2":"val6"}]
	val5	val6	

```

For commas in values, we wrap it around quotes. Also standard escape characters apply for strings e.g "\'"

```
firstName John
lastName Smith
isAlive true
age 25
height_cm 167.6
address 
    street 21 2nd Street
    city New York
    state NY
    postalCode 10021-3100

phoneNumbers *-
	type	number
	home	212-555-1234
	office	646-555-4567
	cell	425-999-1234
            
children * Pete Bob Rebecca Alicia

schedule *-,
	time,	event
	8pm,	'Pete\'s birthday party don\'t forget gifts'
	4pm,	meet Gibson
	9pm,	"Date with Laura, buy flowers"

achievements *
    1st Position 2008 Blind Coding
    2nd Position 2015 Ninja Debugger
    1st Position 2014 Human Compiler (This dude writes assembly)

daysFree **
    mon tue wed thu fri sat sun
    0 0 0 1 1 0 0
    0 1 0 1 1 0 0
    0 1 0 0 0 0 0
    0 1 1 1 1 0 0
```

### Comments and Text
Sometimes we'd like to write many properties in one line. Let's make 'address' property a one liner.
The requirement is that there should be no space between '='. It should always be property=val. 
Also if value contains spaces then it should be wrapped in quotes. We'll use this syntax across sml and sss.

* '~' for a block of text. They can be across multiple lines.
* '//' for block comments. They are block level too

```
firstName John
lastName Smith
isAlive true
age 25
height_cm 167.6
address - street='21 2nd Street' city='New York' state=NY postalCode=10021-3100 //one liner

// Notes is in markdown 
	A comment can be accross multi line
	as long as it is in a block

notes ~
	John's a pretty cool guy. He's got his life together
	I think we should promote him next year

	This is only and only if he **kicks ass** in [projectX](http://projectX)

phoneNumbers *-
	type	number
	home	212-555-1234
	office	646-555-4567
	cell	425-999-1234
            
children * Pete Bob Rebecca Alicia

schedule *-,
	time,	event
	8pm,	'Pete\'s birthday party don\'t forget gifts'
	4pm,	meet Gibson
	9pm,	"Date with Laura, buy flowers"

achievements *
    1st Position 2008 Blind Coding
    2nd Position 2015 Ninja Debugger
    1st Position 2014 Human Compiler (This dude writes assembly)

daysFree **
    mon tue wed thu fri sat sun
    0 0 0 1 1 0 0
    0 1 0 1 1 0 0
    0 1 0 0 0 0 0
    0 1 1 1 1 0 0
```
