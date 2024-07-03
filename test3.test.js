const { updateAriaLabelledby, ensureUniqueIds, setMainRole } = require('./domUtils');

describe('DOM Manipulation Functions', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="cmp-tabs__tablist">
        <li aria-controls="tab1-panel"></li>
        <li aria-controls="tab2-panel"></li>
      </div>
      <div id="tab1-tab"></div>
      <div id="tab2-tab"></div>
      <div id="tab1-panel"></div>
      <div id="tab2-panel"></div>
      <div class="pnc-demos"></div>
    `;
  });

  test('updateAriaLabelledby should set aria-labelledby attributes correctly', () => {
    updateAriaLabelledby();

    const tab1 = document.getElementById('tab1-tab');
    const tab2 = document.getElementById('tab2-tab');

    expect(tab1.getAttribute('aria-labelledby')).toBe('tab1-tab');
    expect(tab2.getAttribute('aria-labelledby')).toBe('tab2-tab');
  });

  test('ensureUniqueIds should ensure unique IDs', () => {
    document.body.innerHTML += `
      <div id="duplicate"></div>
      <div id="duplicate"></div>
    `;

    ensureUniqueIds();

    const ids = Array.from(document.querySelectorAll('[id]')).map(el => el.id);

    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
    expect(ids.includes('duplicate_1')).toBe(true);
  });

  test('setMainRole should set role="main" on .pnc-demos', () => {
    setMainRole();

    const main = document.querySelector('.pnc-demos');
    expect(main.getAttribute('role')).toBe('main');
  });
});
