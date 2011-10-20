/*
	Kailash Nadh (http://kailashnadh.name)

	tinytabs
	October 2011
	A tiny tabbed interface plugin for jQuery

	License	:	MIT License
*/
(function($) {
	$.fn.tinytabs = function(new_options) {

		// default options
		var options = {
			anchor: true,
			hide_title: true,
			section_class: 'section',
			tabs_class: 'tabs',
			tab_class: 'tab',
			title_class: 'title'
		};
		var tabs = null,
			container = this,
			sections = {};

		if(new_options) {
			$.extend(options, new_options);
		}

		create();

		// ______________________ private methods

		// initialize the tabs
		function create() {
			// create tabs container
			tabs = $('<ul>').attr('class', options.tabs_class);
			container.addClass('tinytabs').prepend(tabs);

			// create tabs
			container.find(' .' + options.section_class).each(function() {
				var section = $(this),
					id = section.attr('id'),
					title = getTitle(section);

				if(!id) return true;

				sections[id] = section;

				// hide title?
				options.hide_title ? title.hide() : null;

				$(tabs).append(
					$('<li>').addClass(options.tab_class + ' tab-' + id).append(
						$('<a>').html( title.html() ).attr('href', '#tab-'+ id ).click(function() {
							activate(id);
							return options.anchor;
						})
					)
				);
			});
			$(tabs).append($('<li>').addClass('clear'));

			// is anchoring enabled?
			var href = document.location.hash.replace('#tab-', '');
			if(options.anchor && href && activate(href)) {
			} else {
				for(var id in sections) {
					activate(id);
					break;
				}
			}
		}

		// get the title element of a section
		function getTitle(section) {
			return section.find('.' + options.title_class + ':first');
		}

		// activate a tab
		function activate (id) {
			if(sections[id]) {
				var section = sections[id];
			} else {
				return false;
			}

			reset();

			var new_tab = tabs.find('.tab-' + id).addClass('sel'),
					new_section = sections[id],
					title = getTitle(new_section).html();

			// before and after callbacks
			options.before && options.before(new_tab, title);
			new_section.show();
			options.after && options.after(new_tab, title);

			if(options.anchor) {
				document.location.href = '#tab-' + id;
			}

			return true;
		};

		// reset all tabs
		function reset() {
			tabs.children().removeClass('sel');
			$.each(sections, function() {
				this.hide();
			});
		};

		return this;
	}
})(jQuery);
