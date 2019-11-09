import iframeLoadingFunction from './helpers/iframeLoading';

const portfolioDescriptionFunction = function () {

    const appIcon = $('.desktop__files-icon--portfolio');
    const swiperSlide = $('.swiper-slide');
    const activeTabClass = 'window__toolbar-text--active';

    appIcon.on('click', function () {
        const tabActiveSlide = $('.app--portfolio .window__toolbar--tabs .window__toolbar-text[index=0]');
        tabActiveSlide.addClass(activeTabClass).siblings().removeClass(activeTabClass);
        setTimeout(function () {
            iframeLoadingFunction(0);
        }, 1500);
        $(swiperSlide[0]).attr('data-active', true);
        tabActiveSlide.click();
    });
};

export default portfolioDescriptionFunction;