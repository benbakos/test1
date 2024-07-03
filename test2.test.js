const $ = require('jquery');

describe('DOM Manipulation Tests', () => {
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

  function updateAriaLabelledby() {
    var tabs = document.querySelectorAll(".cmp-tabs__tablist > li");
    if (tabs && tabs.length > 0) {
      for (var i = 0; i < tabs.length; i++) {
        var el = tabs[i].getAttribute('aria-controls');
        if (el) {
          var e = document.getElementById(el.split('tabpanel')[0].slice(0, -1) + "-tab");
          if (e) {
            e.setAttribute('aria-labelledby', e.id);
          }
        }
      }
    }
  }

  function ensureUniqueIds() {
    var ids = document.querySelectorAll('[id]');
    if (ids && ids.length > 0) {
      ids.forEach(function (e) {
        try {
          var el = $('[id=' + e.id + ']');
          if (el && el.length > 1) {
            document.getElementById(e.id).id = e.id + '_1';
          }
        } catch {
          // Ignore errors
        }
      });
    }
  }

  function setMainRole() {
    var main = document.getElementsByClassName("pnc-demos");
    if (main && main.length > 0) {
      main[0].setAttribute("role", "main");
    }
  }

  // Execute functions
  updateAriaLabelledby();
  ensureUniqueIds();
  setMainRole();

  test('should set aria-labelledby attributes correctly', () => {
    const tab1 = document.getElementById('tab1-tab');
    const tab2 = document.getElementById('tab2-tab');

    expect(tab1.getAttribute('aria-labelledby')).toBe('tab1-tab');
    expect(tab2.getAttribute('aria-labelledby')).toBe('tab2-tab');
  });

  test('should ensure unique IDs', () => {
    const ids = Array.from(document.querySelectorAll('[id]')).map(el => el.id);

    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  test('should set role="main" on .pnc-demos', () => {
    const main = document.querySelector('.pnc-demos');
    expect(main.getAttribute('role')).toBe('main');
  });
});
