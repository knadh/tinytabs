# tinytabs
tinytabs is a tiny (1.3 KB minified) Javascript tabbing
library. Zero dependencies. All you need is a few layers in a container layer, and
bam, tabbed interface. If Javascript is not enabled, it degrades
nicely too.

Documentation and Demo: https://nadh.in/code/tinytabs

![image](https://user-images.githubusercontent.com/547147/60380775-8f1f9a00-9a68-11e9-9ab1-f88d32dd74d9.png)

## Example

### HTML
```html
<!-- Include the CSS file in <head> //-->
<link rel="stylesheet" type="text/css" href="tinytabs.css" />

<!-- Content to tab //-->
<div id="mytabs">
	<div class="section" id="music">
		<h3 class="title">Music</h3>
		Content here
	</div>
	<div class="section" id="videos">
		<h3 class="title">Videos</h3>
		Content
	</div>
</div>

<script>
// With options.
document.addEventListener("DOMContentLoaded", function(e) { 
  tinytabs(document.querySelector("#mytabs"), {
    anchor: true,
    hideTitle: false,
    closable: true,
    onClose: function (id) {
      console.log(id)
    }
  });
});

// Without options.
document.addEventListener("DOMContentLoaded", function(e) { 
  tinytabs(document.querySelector("#mytabs"));
})
</script>
```

## Options
| anchor       | true (default) or false. If enabled, when a tab is clicked, it's id is set in url's fragment so that the tab is retained on page reloads. Also enables linking to a tab directly. Eg: `http://nadh.in/code/tinytabs#tab-example`  |
|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| hideTitle    | true (default) or falseHide the title element within section elements.                                                                                                                                                          |
| sectionClass | Section element's class. Default is section.                                                                                                                                                                                    |
| tabsClass    | Tab (ul) container's class. Default is tabs.                                                                                                                                                                                    |
| tabClass     | Individual tab's (li) class. Default is tab.                                                                                                                                                                                    |
| titleClass   | Title element's tag. Default is title.                                                                                                                                                                                          |
| onBefore       | function(id, tab). Callback function that gets evaluated before a tab is activated. The first arg is the id of the tab and the second is the DOM element of the tab.                                                            |
| onAfter        | function(id, tab). Callback function that gets evaluated after a tab is activated. The first arg is the id of the tab and the second is the DOM element of the tab.                                                             |
| onClose        | function(id). Callback function that gets evaluated while closing the tab. The argument is the id of the tab.                                                             |                                          

MIT License.
