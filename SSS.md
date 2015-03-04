SSS (Simple Stylesheets)
===

Basics like /// for ignored comments and // for block comments apply.

We ignore curly braces and semicolons

### Nesting

```
#navigation > ul
	display flex
    flex-flow row no-wrap
    background #fff
    color #000
    
    // Some comment
    
    li
    	list-style-type none
        margin 0
        padding 5px 10px
        
        a
        	color inherit
            
            &:hover
            	text-decoration none
                font-weight bold
    
```

### Fuzzy Search

Like [SML](SML.md) we can turn on fuzzy search which allows us to type a lot less

TODO: Link to fuzzy table of list of properties and values

```
///: fuzzy

#navigation > ul
	d f
    flf r n
    ba #000
    co #fff
    
    // Some comment
    
    li
    	lit n
        m 0
        p 5 10
        
        a
        	co i
            
            &:h
            	ted n
                fow b
    

```

Now since fuzzy reduces the characters per line we can write the properties as one liners. 

Like SML, we can use prop:val or prop=val. Only rule is that there should be no space between : or = .

Use '-' (inline curly) to denote separation between selector and list of properties


```
///: fuzzy
#navigation > ul - d:f flf:'r n' ba=#000 co=#fff 
    // Some comment
    
    li - lit:n m:0 p:'5 10'
    	a - co:i
        	&:h - ted:n fow:b
```

It looks quite cryptic. But hopefully once we have a block editor with code completion and validation it will be a breeze to write css at the speed of your thought


### Variables

Variables are marked with $. They are scoped and evaluated in a second pass (lazy eval).

See [Less Scopes & Lazy Eval](http://lesscss.org/features/#features-overview-feature-scope)

```
///: fuzzy

$bColor #000
$fColor #fff

#navigation > ul - d:f flf:'r n' ba:$bColor co:$fColor
    // Some comment
    li - lit:n m:0 p:$pad
    	a - co:i
        	&:h - ted:n fow:b
            
            
    $pad 5 10
```

### Functions

Support Simple Math, color and path functions

### Mixins

See [Stylus Mixins](http://learnboost.github.io/stylus/docs/mixins.html)


### Includes

```include(path)``` will include the sss or css in the current file

```include-once(path)``` does what it says. It includes only once.

### Notes

Our goal is to keep SSS simple. With the limited set of features it should be able to get you to 99%.

