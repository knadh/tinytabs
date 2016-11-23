# tinytabs
Forked from [Kailash Nadh's](http://kailashnadh.name/code/tinytabs)

Adds a vertical tab option, along with the ability to customize the parent class for the same


tinytabs is a tiny (1.1 KB minified) tabbing plugin for jQuery. All you need is a few layers in a container layer, and bam, tabbed interface.

Kailash Nadh, October 2011

License:	MIT License

Documentation and Demo: http://kailashnadh.name/code/tinytabs

Thanks to [Sascha Depold's](http://depold.com) contributions

## Example

### HTML - Setup
<pre>
&lt;head&gt;
	&lt;script type="text/javascript" src="lib/jquery.min.js"&gt;&lt;/script&gt;

	&lt;link rel="stylesheet" type="text/css" href="src/jquery.tinytabs.css"/&gt;
	&lt;script type="text/javascript" src="src/jquery.tinytabs.min.js"&gt;&lt;/script&gt;
&lt;/head&gt;
</pre>

### HTML - Usage
<pre>
&lt;div id=&quot;mytabs&quot;&gt;
	&lt;div class=&quot;section&quot; id=&quot;music&quot;&gt;
		&lt;h3 class=&quot;title&quot;&gt;Music&lt;/h3&gt;
		Content here
	&lt;/div&gt;

	&lt;div class=&quot;section&quot; id=&quot;videos&quot;&gt;
		&lt;h3 class=&quot;title&quot;&gt;Videos&lt;/h3&gt;
		Content
	&lt;/div&gt;
&lt;/div&gt;
</pre>

### Javascript
<pre>
$(document).ready(function() {
	$('#mytabs').tinytabs();

	// or

	$('#mytabs').tinytabs({		// optional options
		anchor: false,
		hide_title: false
	});
});
</pre>

## Options
<table border="1">
	<tbody>
		<tr>
			<td>anchor</td>
			<td>
				<strong><em>true</em> (default) or <em>false</em></strong><br />
				If enabled, when a tab is clicked, it's id is set in url's hashtag so that the tab
				is retained on page reloads. Also enables linking to a tab directly.<br />
				Eg: http://kailashnadh.name/tinytabs#tab-example
			</td>
		</tr>
		<tr>
			<td>hide_title</td>
			<td>
				<strong><em>true</em> (default) or <em>false</em></strong><br />
				Hide the title element within section elements.
			</td>
		</tr>
		<tr>
			<td>section_class</td>
			<td>
				Section element's class. Default is <strong><em>section</em></strong>.
			</td>
		</tr>
		<tr>
			<td>tabs_class</td>
			<td>
				Tab (ul) container's class. Default is <strong><em>tabs</em></strong>.
			</td>
		</tr>
		<tr>
			<td>tab_class</td>
			<td>
				Individual tab's (li) class. Default is <strong><em>tab</em></strong>.
			</td>
		</tr>
		<tr>
			<td>title_class</td>
			<td>
				Title element's tag. Default is <strong><em>title</em></strong>.
			</td>
		</tr>
		<tr>
			<td>before</td>
			<td>
				A function that gets evaluated before a tab is activated. Default is <strong><em>nothing</em></strong>.<br/>
				If a function is defined, the first parameter will be the tab (DOM-element), the second one is the title of the tab.
			</td>
		</tr>
		<tr>
			<td>after</td>
			<td>
				A function that gets evaluated after a tab has been activated. Default is <strong><em>nothing</em></strong>.<br/>
				If a function is defined, the first parameter will be the tab (DOM-element), the second one is the title of the tab.
			</td>
		</tr>
	</tbody>
</table>
