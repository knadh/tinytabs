/*
	Kailash Nadh (http://kailashnadh.name)
	
	tinytabs
	October 2011
	A tiny tabbed interface plugin for jQuery

	License	:	MIT License
*/
(function(a){a.fn.tinytabs=function(b){function j(){d.children().removeClass("sel");a.each(f,function(){this.hide()})}function i(a){if(f[a]){var b=f[a]}else{return false}j();var e=d.find(".tab-"+a).addClass("sel"),g=f[a],i=h(g).html();c.before&&c.before(e,i);g.show();c.after&&c.after(e,i);if(c.anchor){document.location.href="#tab-"+a}return true}function h(a){return a.find("."+c.title_class+":first")}function g(){d=a("<ul>").attr("class",c.tabs_class);e.addClass("tinytabs").prepend(d);e.find(" ."+c.section_class).each(function(){var b=a(this),e=b.attr("id"),g=h(b);if(!e)return true;f[e]=b;c.hide_title?g.hide():null;a(d).append(a("<li>").addClass(c.tab_class+" tab-"+e).append(a("<a>").html(g.html()).attr("href","#tab-"+e).click(function(){i(e);return c.anchor})))});a(d).append(a("<li>").addClass("clear"));var b=document.location.hash.replace("#tab-","");if(c.anchor&&b&&i(b)){}else{for(var g in f){i(g);break}}}var c={anchor:true,hide_title:true,section_class:"section",tabs_class:"tabs",tab_class:"tab",title_class:"title"};var d=null,e=this,f={};if(b){a.extend(c,b)}g();return this}})(jQuery)