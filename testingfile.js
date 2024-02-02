describe('DOM manipulation tests', () => {
    // Mocking global functions
    global.handleChange = function(e) {
        // Original handleChange function code here
    };

    global.removeActiveClass = function() {
        // Original removeActiveClass function code here
    };

    // Setup DOM elements
    beforeAll(() => {
        // Mock elements that your functions expect to find and manipulate
        document.body.innerHTML = `
            <label id="label-test" for="radio-test">Test Label</label>
            <img id="img-test" src="test.jpg" />
            <img id="img-selected-test" class="hide" src="test-selected.jpg" />
        `;
    });

    test('handleChange adds and removes classes correctly', () => {
        const mockEvent = { value: 'test' };
        global.handleChange(mockEvent);

        const label = document.getElementById('label-test');
        const img = document.getElementById('img-test');
        const imgSelected = document.getElementById('img-selected-test');

        expect(label.classList.contains('cmp-form-options__field-label-selected')).toBe(true);
        expect(img.classList.contains('hide')).toBe(true);
        expect(imgSelected.classList.contains('hide')).toBe(false);
    });

    test('removeActiveClass removes classes correctly', () => {
        // Precondition: Elements have certain classes
        document.getElementById('label-test').classList.add('cmp-form-options__field-label-selected');
        document.getElementById('img-selected-test').classList.remove('hide');

        // Call the function under test
        global.removeActiveClass();

        // Assertions
        expect(document.getElementById('label-test').classList.contains('cmp-form-options__field-label-selected')).toBe(false);
        expect(document.getElementById('img-selected-test').classList.contains('hide')).toBe(true);
        // Ensure the non-selected img is visible
        expect(document.getElementById('img-test').classList.contains('hide')).toBe(false);
    });
});
