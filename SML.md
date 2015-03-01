SML (Simple Markup Language)
===

This is a sample html file of the homepage of a hypothetical company 'X Inc'.

We've passed it through an indenter so it is pretty printed.

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