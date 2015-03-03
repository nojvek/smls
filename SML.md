SML (Simple Markup Language)
===

This is a sample html file of the homepage of a hypothetical company 'X Inc'.

Let's reduce the amount of typing. As you'll see ideas from Jade and Emmet are borrowed.
```
<!DOCTYPE html>
<html>
	<head>
		<title>Jade - Template Engine</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="stylesheet" href="/css/style.css" type="text/css" />

		<!--[if lt IE 9]>
			<link rel="stylesheet" media="all" type="text/css" href="css/ie.css" />
			<script type="text/javascript" src="js/PIE.js"></script>
		<![endif]-->
	</head>
	<body>
		<div id="navigation" class="dropdown-menu">
			<ul>
				<li>
					<a href="/">Home</a>
				</li>
				<li>
					<a href="#">Products</a>
					<ul>
						<li>
							<a href="/pages/productX">Product X</a>
						</li>
						<li>
							<a>Why you need it</a>
							<ul>
								<li>
									<a href="/pages/product1/config1">Run Faster</a>
								</li>
								<li>
									<a href="/pages/product1/config1">Jump Higher</a>
								</li>
							   <li>
									<a href="/pages/product1/config1">Lift Heavier</a>
								</li>
							</ul>
						</li>
						<li>
							<a href="/pages/blog">Blog</a>
						</li>
						<li>
							<a href="/pages/contact">Contact</a>
						</li>
					</ul>
				</li>
			</ul>
			<br class="c1" />
		</div>
		<div class="intro">
			<div class="container viewbox center-y">
				<div class="center-x">
					<strong class="logo"><a href="#">X INC</a></strong>
					<h1> RUN FASTER . JUMP HIGHER . LIFT HEAVIER </h1>
					<div class="search">
						<input id="searchBox" data-placeholder="Search benefits" class="placeholder" />
					</div>
				</div>
			</div>
			<div class="slides viewbox">
				<div class="slide">
					<img style="background-image:url(media/slides/productX.jpg)" />
				</div>
				<div class="slide">
					<img style="background-image:url(media/slides/benefits.jpg)" />
				</div>
				<div class="slide">
					<img style="background-image:url(media/slides/before_after.jpg)" />
				</div>
			</div>
		</div>
		<div class="tag-line container viewbox center-y">
			<div class="center-x">
				<p>
					You need <strong>Product X</strong>. Latest research into human body
					has produced a ground breaking formula to make you 
					<a href="/pages/superhuman"><img class="thumb" src="superhuman.jpg"></img>super human</a>
				</p>
				<table>
					<tr>
						<th>Ingredient</th>
						<th>Benefit</th>
					</tr>
					<tr>
						<td>Cheetonix</td>
						<td>Run fast like a cheetah, with endurance like a kenyan runner</td>
					</tr>
					<tr>
						<td>Kangafoo</td>
						<td>Leap buildings and kick box like aussie kangaroos</td>
					</tr>
					<tr>
						<td>Kongpro</td>
						<td>Build 10x normal muscle strength without weight increase. 
							<span class='highlight'>Needs genetic evaluation</span>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<footer>
			<div class="contact">
				<div class="container">
					<span>Got a question you'd like to ask?</span> We're here to help
					<ul>
						<li class="mail">
							<a href="mailto:info@x.com">info@x.com</a>
						</li>
						<li class="phone">
							<a href="callto:+12345678910">+1 (234) 567 9910</a>
						</li>
					</ul>
				</div>
			</div>
			<!-- TODO: add correct links for social bookmarks -->
			<div class="container bottom">
				<strong class="logo">
					<a href="#">X Inc</a>
				</strong>
				<ul class="social">
					<li class="facebook">
						<a href="#">facebook</a>
					</li>
					<li class="google">
						<a href="#">google</a>
					</li>
					<li class="twitter">
						<a href="#">twitter</a>
					</li>
					<li class="linkedin">
						<a href="#">linkedin</a>
					</li>
					<li class="youtube">
						<a href="#">youtube</a>
					</li>
				</ul>
			</div>
		</footer>

		<script type="text/javascript">
			var _gaq = _gaq || [];
			_gaq.push(['_setAccount', 'UA-1234567']);
			_gaq.push(['_trackPageview']);

			// initialize google analytics
		</script>
		<script src="/client.js" type="text/javascript"></script>
		<script src="http://code.jquery.com/jquery-2.1.1.min.js" type="text/javascript"></script>
		<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js" type="text/javascript"></script>
	</body>
</html>
```


 * Indentation communicates structure. 
 * Let's remove ending tags.
 * No quotes on property values. If they have a space then its prop='some val here' 
 * '//' indicates block comment
 * '~' indicates a multiline string. Its like CDATA. Its unprocessed.

```
doctype html
html
	head
		title Jade - Template Engine	
		meta charset=utf-8	
		meta name=viewport content="width=device-width, initial-scale=1.0" 	
		link rel=stylesheet href=/css/style.css type=text/css	

		// [if lt IE 9]
				<link rel="stylesheet" media="all" type="text/css" href="css/ie.css" />	
				<script type="text/javascript" src="js/PIE.js" />	
			![endif]
		
	body
		div id=navigation class=dropdown-menu
			ul
				li
					a href=/ Home	
					
				li
					a href=# Products	
					ul
						li
							a href=/pages/productX Product X	
							
						li
							a Why you need it	
							ul
								li
									a href=/pages/product1/config1 Run Faster	
									
								li
									a href=/pages/product1/config1 Jump Higher	
									
							   li
									a href=/pages/product1/config1 Lift Heavier	

						li
							a href=/pages/blog Blog	
							
						li
							a href=/pages/contact Contact	

			br class=c1	
			
		div class=intro
			div class="container viewbox center-y"
				div class=center-x
					strong class=logoa href=# X INC	
					h1 RUN FASTER . JUMP HIGHER . LIFT HEAVIER	
					div class=search
						input id=searchBox data-placeholder="Search benefits" class=placeholder	
	
			div class="slides viewbox"
				div class=slide
					img style=background-image:url(media/slides/productX.jpg) 	
					
				div class=slide
					img style=background-image:url(media/slides/benefits.jpg) 	
					
				div class=slide
					img style=background-image:url(media/slides/before_after.jpg) 	
			
		div class="tag-line container viewbox center-y"
			div class=center-x
				p
					You need strong Product X	. Latest research into human body
					has produced a ground breaking formula to make you	
					a href=/pages/superhumanimg class=thumb src=superhuman.jpg	super human	
					
				table
					tr
						th Ingredient	
						th Benefit	
						
					tr
						td Cheetonix	
						td Run fast like a cheetah, with endurance like a kenyan runner	
						
					tr
						td Kangafoo	
						td Leap buildings and kick box like aussie kangaroos	
						
					tr
						td Kongpro	
						td Build 10x normal muscle strength without weight increase. 
							span class='highlight' Needs genetic evaluation	

		footer
			div class=contact
				div class=container
					span Got a question you'd like to ask?	 We're here to help
					ul
						li class=mail
							a href=mailto:info@x.com info@x.com	
							
						li class=phone
							a href=callto:+12345678910+1 (234) 567 9910	
							
						
			// TODO: add correct links for social bookmarks
			div class="container bottom"
				strong class=logo
					a href=# X Inc	
					
				ul class=social
					li class=facebook
						a href=# facebook	
						
					li class=google
						a href=# google	
						
					li class=twitter
						a href=# twitter	
						
					li class=linkedin
						a href=# linkedin	
						
					li class=youtube
						a href=# youtube	
						
		script type=text/javascript ~
			var _gaq = _gaq || [];
			_gaq.push(['_setAccount', 'UA-1234567']);
			_gaq.push(['_trackPageview']);

			// initialize google analytics
			
		script src=/client.js type=text/javascript	
		script src=http://code.jquery.com/jquery-2.1.1.min.js type=text/javascript	
		script src=http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js type=text/javascript	
```

 * The basic format is nodeName prop1=val1 prop2=val2 text ...
 * Let's use CSS selectors: '#' for id and '.' for class. 
 * For inline tags. '>' for opening a block and '<' for closing it. Unclosed '>' and <' are automatically closed. 
 * Default tag is 'div'
 * As you notice selectors correspond closely to CSS selectors. 
 * '`' backtick corresponds to text node
 
 
 
 ```
doctype html
html
	head
		title Jade - Template Engine	
		meta charset=utf-8	
		meta name=viewport content="width=device-width, initial-scale=1.0" 	
		link rel=stylesheet href=/css/style.css type=text/css	

		// 	[if lt IE 9]
			<link rel="stylesheet" media="all" type="text/css" href="css/ie.css" />	
			<script type="text/javascript" src="js/PIE.js" />
			![endif]
		
	body
		#navigation.dropdown-menu
			ul
				li >a href=/ Home	
				li
					a href=# Products	
					ul
						li>a href=/pages/productX Product X	
						li
							a Why you need it	
							ul
								li>a href=/pages/product1/config1 Run Faster	
								li>a href=/pages/product1/config1 Jump Higher
								li>a href=/pages/product1/config1 Lift Heavier	
									
					li>a href=/pages/blog Blog	
					li>a href=/pages/contact Contact	

			br.cl	
			
		.intro
			.container.viewbox.center-y
				.center-x
					strong.logo >a href=# X INC	
					h1 RUN FASTER . JUMP HIGHER . LIFT HEAVIER	
					.search > input#searchBox.placeholder data-placeholder="Search benefits"	
	
			slides.viewbox
				.slide >img style=background-image:url(media/slides/productX.jpg) 	
				.slide >img style=background-image:url(media/slides/benefits.jpg) 	
				.slide >img style=background-image:url(media/slides/before_after.jpg) 	
			
		.tag-line.container.viewbox.center-y
			.center-x
				p
					`You need > strong Product X <. Latest research into human body
					`has produced a ground breaking formula to make you	
					a href=/pages/superhumanimg.thumb > img src=superhuman.jpg super human
					
				table
					tr
						th Ingredient	
						th Benefit	
					tr
						td Cheetonix	
						td Run fast like a cheetah, with endurance like a kenyan runner	
					tr
						td Kangafoo	
						td Leap buildings and kick box like aussie kangaroos
					tr
						td Kongpro	
						td Build 10x normal muscle strength without weight increase. 
							span class='highlight' Needs genetic evaluation	

		footer
			.contact
				.container
					` > span Got a question you'd like to ask? < We're here to help
					ul
						li.mail > a href=mailto:info@x.com info@x.com
						li.phone > a href=callto:+12345678910 +1 (234) 567 9910	
							
						
			// TODO: add correct links for social bookmarks
			container.bottom
				strong.logo > a href=# X Inc	
					
				ul.social
					li.facebook > a href=# facebook	
					li.google > a href=# google	
					li.twitter > a href=# twitter	
					li.linkedin > a href=# linkedin	
					li.youtube > a href=# youtube	
						
		script type=text/javascript ~
			var _gaq = _gaq || [];
			_gaq.push(['_setAccount', 'UA-1234567']);
			_gaq.push(['_trackPageview']);

			// initialize google analytics
			
		script src=/client.js type=text/javascript	
		script src=http://code.jquery.com/jquery-2.1.1.min.js type=text/javascript	
		script src=http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js type=text/javascript	
		
 ```


 ```
doctype html
html
	head
		title Jade - Template Engine	
		meta charset=utf-8	
		meta name=viewport content="width=device-width, initial-scale=1.0" 	
		link rel=stylesheet href=/css/style.css type=text/css	

		// 	[if lt IE 9]
			<link rel="stylesheet" media="all" type="text/css" href="css/ie.css" />	
			<script type="text/javascript" src="js/PIE.js" />
			![endif]
		
	body
		#navigation.dropdown-menu
			ul
				li >a href=/ Home	
				li
					a href=# Products	
					ul
						li>a href=/pages/productX Product X	
						li
							a Why you need it	
							ul
								li>a href=/pages/product1/config1 Run Faster	
								li>a href=/pages/product1/config1 Jump Higher
								li>a href=/pages/product1/config1 Lift Heavier	
									
						li>a href=/pages/blog Blog	
						li>a href=/pages/contact Contact	

			br.cl	
			
		.intro
			.container.viewbox.center-y
				.center-x
					strong.logo >a href=# X INC	
					h1 RUN FASTER . JUMP HIGHER . LIFT HEAVIER	
					.search > input#searchBox.placeholder data-placeholder="Search benefits"	
	
			slides.viewbox
				.slide >img style=background-image:url(media/slides/productX.jpg) 	
				.slide >img style=background-image:url(media/slides/benefits.jpg) 	
				.slide >img style=background-image:url(media/slides/before_after.jpg) 	
			
		.tag-line.container.viewbox.center-y
			.center-x
				p
					`You need > strong Product X <. Latest research into human body
					`has produced a ground breaking formula to make you	
					a href=/pages/superhumanimg.thumb > img src=superhuman.jpg super human
					
				table
					tr
						th Ingredient	
						th Benefit	
					tr
						td Cheetonix	
						td Run fast like a cheetah, with endurance like a kenyan runner	
					tr
						td Kangafoo	
						td Leap buildings and kick box like aussie kangaroos
					tr
						td Kongpro	
						td Build 10x normal muscle strength without weight increase. 
							span class='highlight' Needs genetic evaluation	

		footer
			.contact
				.container
					` > span Got a question you'd like to ask? < We're here to help
					ul
						li.mail > a href=mailto:info@x.com info@x.com
						li.phone > a href=callto:+12345678910 +1 (234) 567 9910	
							
						
			// TODO: add correct links for social bookmarks
			container.bottom
				strong.logo > a href=# X Inc	
					
				ul.social
					li.facebook > a href=# facebook	
					li.google > a href=# google	
					li.twitter > a href=# twitter	
					li.linkedin > a href=# linkedin	
					li.youtube > a href=# youtube	
						
		script type=text/javascript ~
			var _gaq = _gaq || [];
			_gaq.push(['_setAccount', 'UA-1234567']);
			_gaq.push(['_trackPageview']);

			// initialize google analytics
			
		script src=/client.js type=text/javascript	
		script src=http://code.jquery.com/jquery-2.1.1.min.js type=text/javascript	
		script src=http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js type=text/javascript	
 ```

* '*' (multiplier) is used to wrap children (see below).
* '-' used in conjuction with a multiplier represents the wrapper. e.g ul*li>a represents the 'li>a' 
* '!' acts as the exception. It ignores the wrapper
* '\`' can be used as a wrapper to wrap text nodes e.g 'p*`' will make a list of wrapped text nodes that can have inline span and a elements

```
doctype html
html
	head
		title Jade - Template Engine	
		meta charset=utf-8	
		meta name=viewport content="width=device-width, initial-scale=1.0" 	
		link rel=stylesheet href=/css/style.css type=text/css	

		// 	[if lt IE 9]
			<link rel="stylesheet" media="all" type="text/css" href="css/ie.css" />	
			<script type="text/javascript" src="js/PIE.js" />
			![endif]
		
	body
		#navigation.dropdown-menu
			ul*li>a
				href=/ Home	
				!li
					a href=# Products	
					ul*li>a
						href=/pages/productX Product X	
						!li
							a Why you need it	
							ul*li>a
								href=/pages/product1/config1 Run Faster	
								href=/pages/product1/config1 Jump Higher
								href=/pages/product1/config1 Lift Heavier	
									
						href=/pages/blog Blog	
						href=/pages/contact Contact	

			br.cl	
			
		.intro
			.container.viewbox.center-y
				.center-x
					strong.logo >a href=# X INC	
					h1 RUN FASTER . JUMP HIGHER . LIFT HEAVIER	
					.search > input#searchBox.placeholder data-placeholder="Search benefits"	
	
			slides.viewbox*slide>img
				style=background-image:url(media/slides/productX.jpg) 	
				style=background-image:url(media/slides/benefits.jpg) 	
				style=background-image:url(media/slides/before_after.jpg) 	
			
		.tag-line.container.viewbox.center-y
			.center-x
				p*`
					You need > strong Product X <. Latest research into human body
					has produced a ground breaking formula to make you	
					> a href=/pages/superhumanimg.thumb > img src=superhuman.jpg super human
					
				table*tr*td
					!*th
						Ingredient	
						Benefit	
					-
						Cheetonix	
						Run fast like a cheetah, with endurance like a kenyan runner	
					-
						Kangafoo	
						Leap buildings and kick box like aussie kangaroos
					-
						Kongpro	
						Build 10x normal muscle strength without weight increase. 
							span class='highlight' Needs genetic evaluation	

		footer
			.contact
				.container
					` > span Got a question you'd like to ask? < We're here to help
					ul*li
						.mail > a href=mailto:info@x.com info@x.com
						.phone > a href=callto:+12345678910 +1 (234) 567 9910	
							
						
			// TODO: add correct links for social bookmarks
			container.bottom
				strong.logo > a href=# X Inc	
					
				ul.social*li
					.facebook > a href=# facebook	
					.google > a href=# google	
					.twitter > a href=# twitter	
					.linkedin > a href=# linkedin	
					.youtube > a href=# youtube	
						
		script type=text/javascript ~
			var _gaq = _gaq || [];
			_gaq.push(['_setAccount', 'UA-1234567']);
			_gaq.push(['_trackPageview']);

			// initialize google analytics
			
		script src=/client.js type=text/javascript	
		script src=http://code.jquery.com/jquery-2.1.1.min.js type=text/javascript	
		script src=http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js type=text/javascript
   
```

TODO: Fuzzy match