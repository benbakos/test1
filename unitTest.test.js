// Import the function or code snippet you want to test
const { updateCardBackground } = require('./yourScriptFile');

describe('updateCardBackground function', () => {
  test('it should update the background image of card elements with images', () => {
    // Mocking DOM elements
    document.body.innerHTML = `
      <div class="cmp-container__card-with-image">
        <div class="cmp-contentblock">
          <div class="cmp-contentblock__image">
            <img src="example.jpg">
          </div>
          <div class="cmp-image"></div>
        </div>
      </div>
    `;

    // Run the function to be tested
    updateCardBackground();

    // Assertions
    const contentBlockEl = document.querySelector('.cmp-container__card-with-image .cmp-contentblock');
    expect(contentBlockEl.classList.contains('cq-dd-image')).toBe(false);
    expect(contentBlockEl.querySelector('.cmp-image').style.height).toBe('200px');
    expect(contentBlockEl.querySelector('.cmp-image img')).toBe(null);
    expect(contentBlockEl.querySelector('.cmp-contentblock__image').style.backgroundSize).toBe('cover');
    expect(contentBlockEl.querySelector('.cmp-contentblock__image').style.marginBottom).toBe('20px');
  });

  test('it should not update any elements if there are no card elements with images', () => {
    // Mocking DOM elements
    document.body.innerHTML = `
      <div class="cmp-container__card-without-image">
        <div class="cmp-contentblock"></div>
      </div>
    `;

    // Run the function to be tested
    updateCardBackground();

    // Assertions
    expect(document.querySelector('.cmp-container__card-without-image .cmp-contentblock').classList.contains('cq-dd-image')).toBe(undefined);
    expect(document.querySelector('.cmp-container__card-without-image .cmp-contentblock .cmp-image').style.height).toBe('');
    expect(document.querySelector('.cmp-container__card-without-image .cmp-contentblock .cmp-image img')).toBe(null);
    expect(document.querySelector('.cmp-container__card-without-image .cmp-contentblock .cmp-contentblock__image').style.backgroundSize).toBe('');
    expect(document.querySelector('.cmp-container__card-without-image .cmp-contentblock .cmp-contentblock__image').style.marginBottom).toBe('');
  });
});
