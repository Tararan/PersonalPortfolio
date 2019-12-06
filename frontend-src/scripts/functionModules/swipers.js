import Swiper from 'swiper';
import iframeLoadingFunction from './helpers/iframeLoading';

const swipersFunction = function () {
    const swiperSlide = $('.swiper-slide');
    const tabSlide = $('.app--portfolio .window__toolbar--tabs .window__toolbar-text');
    const activeTabClass = 'window__toolbar-text--active';

    swiperSlide.each(function (index) {
        const self = $(this);
        self.attr('index', index);
        $(tabSlide[index]).attr('index', self.attr('index'));
    });
    /*eslint-disable*/

    const swiperContainer = '.swiper-container';
    const swiper = new Swiper(swiperContainer, {
        slidesPerView: 'auto',
        direction: 'horizontal',
        slideToClickedSlide: true
    });

    tabSlide.on('click', function () {
        const self = $(this);
        const index = parseInt(self.attr('index'));
        swiper.slideTo(index, 250, false);
    });

    swiper.on('slideChange', function () {
        const tabActiveSlide = $(`.app--portfolio .window__toolbar--tabs .window__toolbar-text[index=${swiper.activeIndex}]`);
        tabActiveSlide.addClass(activeTabClass).siblings().removeClass(activeTabClass);
        const activeSlide = $(`.swiper-slide[index=${swiper.activeIndex}]`);
        const activeSlideData = activeSlide.attr('data-active');

        if (activeSlideData !== 'true') {
            iframeLoadingFunction(swiper.activeIndex);
        }
        activeSlide.attr('data-active', true);
    });
    /*eslint-enable*/
};

export default swipersFunction;