// pulseHandler.test.js

const {
    handleSwiperNavigation,
    handleCarouselNavigation,
    handleNoTabNavigation,
    handlePulseClick,
    adjustPulseElementsPosition,
    addCSSRuleAfterDelay
} = require('./pulseHandler');

describe('Pulse Handler Functions', () => {
    beforeEach(() => {
        // Set up the DOM structure and mock functions as needed
        document.body.innerHTML = `
            <div class="cmp-tabs__tab"></div>
            <div class="cmp-tabs__tabpanel--active">
                <div class="swiper-container swiper-container_1"></div>
                <button class="cmp-carousel__action--next"></button>
            </div>
            <div class="swiper-container"></div>
        `;

        document.querySelector('.swiper-container').swiper = {
            slideNext: jest.fn()
        };

        document.querySelector('.swiper-container_1').swiper = {
            slideNext: jest.fn()
        };

        $('.cmp-carousel__action--next').click = jest.fn();
    });

    test('handleSwiperNavigation should call slideNext on active Swiper containers', () => {
        handleSwiperNavigation();
        expect(document.querySelector('.swiper-container_1').swiper.slideNext).toHaveBeenCalled();
    });

    test('handleCarouselNavigation should click the next button in the carousel', () => {
        handleCarouselNavigation();
        expect($('.cmp-carousel__action--next').click).toHaveBeenCalled();
    });

    test('handleNoTabNavigation should call slideNext on the main Swiper container', () => {
        handleNoTabNavigation();
        expect(document.querySelector('.swiper-container').swiper.slideNext).toHaveBeenCalled();
    });

    test('handlePulseClick should navigate correctly based on tabs presence', () => {
        const e = { preventDefault: jest.fn() };

        handlePulseClick(e);
        expect(e.preventDefault).toHaveBeenCalled();
        expect(document.querySelector('.swiper-container_1').swiper.slideNext).toHaveBeenCalled();
    });

    test('adjustPulseElementsPosition should adjust the positions of pulse elements', () => {
        document.body.innerHTML = `
            <div class="pulse-position">
                <div class="pulseIcon">
                    <button style="top: 10%; left: 10%;"></button>
                </div>
            </div>
        `;

        adjustPulseElementsPosition();

        const button = document.querySelector('.pulse-position .pulseIcon button');
        expect(button.style.top).toBe('10.165%');
        expect(button.style.left).toBe('10.15%');
    });

    test('addCSSRuleAfterDelay should add CSS rule after a delay', (done) => {
        jest.useFakeTimers();
        addCSSRuleAfterDelay();
        jest.advanceTimersByTime(4000);

        expect(document.head.innerHTML).toContain('<style>.pulse:before{border:none !important}</style>');
        jest.useRealTimers();
        done();
    });
});
