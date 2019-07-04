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

        // Create close element inside tab.
        var span = document.createElement("span");
        span.classList.add("close");
        span.setAttribute("data-id", "close-" + id);
        span.innerHTML = "×";

        // Create the tab handle.
        var a = document.createElement("a");
        a.classList.add(otps.tabClass, "tab-" + id);
        a.setAttribute("href", "#tab-" + id);
        a.setAttribute("data-id", id);
        a.innerHTML = title.innerHTML;
        if (otps.closable) {
          a.appendChild(span);
        }

        span.onclick = function(event) {

          // get selected tab
          var getDataId, currentTab,
            nextTab, prevTab, section;
          getDataId = this.getAttribute("data-id").split("-")[1];
          currentTab = document.querySelector(".tab-"+getDataId);
          nextTab = currentTab.nextElementSibling;
          prevTab = currentTab.previousElementSibling;

          // remove current tab and section container
          currentTab.parentNode.removeChild(currentTab);
          section = document.querySelector("#"+getDataId);
          section.parentNode.removeChild(section);

          // callback on close
          otps.onClose && otps.onClose(id);

          // choose next tab on closing current tab if not choose prev tab
          if (nextTab) {
            activate(nextTab.getAttribute("data-id"));
          } else if (prevTab) {
            activate(prevTab.getAttribute("data-id"));
          }

          // prevent parent's onclick event from firing when close elem is clicked
          // technically preventing event bubbling
          event.stopPropagation();
          // tells the browser to stop following events
          return false;
        };

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
      otps.onBefore && otps.onBefore(id, newTab);
      show(sections[id]);
      otps.onAfter && otps.onAfter(id, newTab);
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
