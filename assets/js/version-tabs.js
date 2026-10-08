(() => {
  document.querySelectorAll('[data-version-tabs]').forEach((group) => {
    const list = group.querySelector('.version-tabs__list');
    const tabs = [...group.querySelectorAll('[data-version-tab]')];
    const panels = [...group.querySelectorAll('[data-version-panel]')];
    if (!list || !tabs.length || tabs.length !== panels.length) return;
    const select = (index) => {
      tabs.forEach((tab, i) => {
        tab.setAttribute('aria-selected', String(i === index));
        tab.tabIndex = i === index ? 0 : -1;
        panels[i].hidden = i !== index;
      });
    };
    list.setAttribute('role', 'tablist');
    tabs.forEach((tab, index) => {
      tab.setAttribute('role', 'tab');
      panels[index].setAttribute('role', 'tabpanel');
      panels[index].setAttribute('aria-labelledby', tab.id);
      panels[index].tabIndex = 0;
      tab.addEventListener('click', () => select(index));
      tab.addEventListener('keydown', (event) => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next === undefined) return;
        event.preventDefault();
        select(next);
        tabs[next].focus();
      });
    });
    select(0);
    list.hidden = false;
  });
})();
