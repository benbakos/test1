// Import the function to be tested
const animateCardDetails = require('./path/to/your/script');

describe('animateCardDetails function', () => {
    let mockContainer1, mockContainer2, mockContainer3;

    beforeEach(() => {
        // Set up the mock containers
        mockContainer1 = document.createElement('div');
        mockContainer1.classList.add('cmp-container__card-details');
        document.body.appendChild(mockContainer1);

        mockContainer2 = document.createElement('div');
        mockContainer2.classList.add('cmp-container__card-details');
        document.body.appendChild(mockContainer2);

        mockContainer3 = document.createElement('div');
        mockContainer3.classList.add('cmp-container__card-details');
        document.body.appendChild(mockContainer3);
    });

    afterEach(() => {
        // Clean up the mock containers
        document.body.removeChild(mockContainer1);
        document.body.removeChild(mockContainer2);
        document.body.removeChild(mockContainer3);
    });

    test('should add animation class to card details when scrolled or moved', () => {
        // Simulate scrolling or moving
        document.dispatchEvent(new Event('mousemove'));
        document.dispatchEvent(new Event('wheel'));
        document.dispatchEvent(new KeyboardEvent('keydown'));

        // Check if animation class is added to mock containers
        expect(mockContainer1.classList.contains('cmp-container__card-details-animate')).toBe(true);
        expect(mockContainer2.classList.contains('cmp-container__card-details-animate')).toBe(true);
        expect(mockContainer3.classList.contains('cmp-container__card-details-animate')).toBe(true);
    });
});
