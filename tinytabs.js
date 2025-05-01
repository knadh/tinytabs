export default function tinytabs(container, opts = {}) {
  const config = {
    // Change URL anchor + loading on tab click?
    anchor: true,

    // Monitor browser Back/Forward on anchor change and switch tags?
    // Requires anchor: true.
    history: true,

    // Classes.
    sectionClass: 'tab-section',
    tabsClass: 'tabs',
    tabClass: 'tab',
    selClass: 'sel',

    // Callbacks.
    onClose: null,
    onBefore: null,
    onAfter: null,
    ...opts
  };

  // Create the tabs container.
  const tabs = document.createElement('nav');
  tabs.setAttribute('role', 'tablist');
  const sections = {};

  // Apply the classes.
  tabs.classList.add(config.tabsClass);
  container.classList.add('tinytabs');
  container.prepend(tabs);

  let defaultId = null;

  Array.from(container.querySelectorAll(`.${config.sectionClass}`)).forEach(s => {
    const id = s.id;
    if (!id) return;

    if (!defaultId || s.dataset.default) {
      defaultId = id;
    }

    // Collect the sections.
    sections[id] = { section: s };

    // Get the tab name.
    const name = s.dataset['name'] || 'Tab';

    // Create the actual tab link in the nav.
    const tab = document.createElement('a');
    tab.className = `${config.tabClass} tab-${id}`;
    tab.href = `#tab-${id}`;
    tab.setAttribute('role', 'tab');
    tab.dataset.id = id;
    tab.innerText = name;

    // If it's a closable tab, add a close button.
    if ("closable" in s.dataset) {
      const close = document.createElement('span');
      close.className = 'tab-close';
      close.innerHTML = '×';
      close.setAttribute('role', 'button');
      close.setAttribute('aria-label', 'Close tab');
      close.onclick = (e) => {
        remove(id);
        e.stopPropagation();
      };

      // Append the close button to the tab.
      sections[id] = { ...sections[id], tab };
      tab.append(close);
    }

    tab.onclick = e => {
      select(id);
      return config.anchor;
    };

    sections[id].tab = tab;
    tabs.append(tab);
  });

  // Selct a tab.
  const select = (id) => {
    const s = sections[id];
    if (!s) return false;

    // Trigger optional callback.
    config.onBefore?.(id);

    // Reset all tabs.
    reset();

    // Select the current tab and show the current section.
    s.tab.classList.add(config.selClass);
    s.section.style.display = 'block';

    // Trigger optional callback.
    config.onAfter?.(id);

    // Update the URL hash.
    if (config.anchor) {
      location.hash = `tab-${id}`;
    }

    return true;
  };

  const remove = (id) => {
    const s = sections[id];
    if (!s) return false;

    // Get the previous/next tab to active.
    const prev = s.tab.previousElementSibling;
    const next = s.tab.nextElementSibling;


    // Remove the tab and the section.
    s.tab.remove();
    s.section.remove();
    delete (sections[id]);

    // Optionally trigger the close callback.
    config.onClose?.(id);

    // Select the next tab.
    select(next?.dataset.id || prev?.dataset.id || defaultId);
  };

  // Reset the state of all tabs and sections.
  const reset = () => {
    Object.keys(sections).forEach((id) => {
      const s = sections[id];
      s.section.style.display = 'none';
      s.tab.classList.remove(config.selClass);
    });
  };

  // On page load, select the default tab.
  const hashId = location.hash.replace('#tab-', '');
  select(config.anchor && hashId && sections[hashId] ? hashId : defaultId);

  // Watch for the window popstate event and select the tab based on the hash ID.
  if (config.history) {
    window.addEventListener('popstate', () => select(location.hash.replace('#tab-', '')));
  }

  return { select, remove };
};
