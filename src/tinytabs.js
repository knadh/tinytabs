/*
	tinytabs
	A tiny Javascript library for rendering tabbed UIs.

	Kailash Nadh (https://nadh.in), June 2019.
	MIT License
*/

(function() {
  var tinytabs = function(container, newOpts) {
    var otps = {
      anchor: true,
      hideTitle: true,
      sectionClass: "section",
      tabsClass: "tabs",
      tabClass: "tab",
      titleClass: "title",
      selClass: "sel"
    };
    var tabs = [], sections = {};
        otps = Object.assign(otps, newOpts);

    create();

    // Initialize.
    function create() {
      tabs = document.createElement("nav");
      tabs.classList.add(otps.tabsClass);
      container.classList.add("tinytabs");
      container.prepend(tabs);

      // Create individual tabs from sections.
      var all = container.querySelectorAll(" ." + otps.sectionClass);
      Array.from(all).map(section => {
        var id = section.getAttribute("id"),
            title = section.querySelector("." + otps.titleClass);

        // Tab section has to have an ID.
        if (!id) return true;

        sections[id] = section;
        otps.hideTitle ? hide(title) : null;

        // Create the tab handle.
        var a = document.createElement("a");
        a.classList.add(otps.tabClass, "tab-" + id);
        a.setAttribute("href", "#tab-" + id);
        a.setAttribute("data-id", id);
        a.innerHTML = title.innerHTML;
        a.onclick = function() {
          activate(this.getAttribute("data-id"));
          return otps.anchor;
        };

        // Add the tab to the tabs list.
        tabs.appendChild(a);
      });

      // Is anchoring enabled?
      var href = document.location.hash.replace("#tab-", "");
      if (otps.anchor && href) {
        activate(href);
      } else {
        for (var id in sections) {
          activate(id);
          break;
        }
      }
    }

    function hide(e) {
      e.style.display = "none";
    }

    function show(e) {
      e.style.display = "block";
    }

    // activate a tab
    function activate(id) {
      var section = null;
      if (sections[id]) {
        section = sections[id];
      } else {
        return false;
      }
      reset();

      var newTab = tabs.querySelector(".tab-" + id);
      if (newTab) {
        newTab.classList.add(otps.selClass);
      }

      // before and after callbacks
      otps.before && otps.before(id, newTab);
      show(sections[id]);
      otps.after && otps.after(id, newTab);

      if (otps.anchor) {
        document.location.href = "#tab-" + id;
      }

      return true;
    }

    // Reset all tabs.
    function reset() {
      Array.from(tabs.querySelectorAll("." + otps.tabClass)).map(e => e.classList.remove(otps.selClass));
      Object.values(sections).map(e => hide(e));
    }

    return this;
  };

  if (typeof define === "function" && define.amd) {
    define(tinytabs);
  } else if (typeof module !== "undefined") {
    module.exports = tinytabs;
  } else {
    window.tinytabs = tinytabs;
  }
})();
