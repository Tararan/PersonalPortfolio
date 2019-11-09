const iframeLoadingFunction = function (i) {
    const iframeEl = document.createElement('img');

    const fragment = document.createDocumentFragment(iframeEl);
    const swiperSlide = $(`.app--portfolio .swiper-slide[index=${i}]`);
    const visibleDescriptionClass = 'swiper-slide--visible-description';
    const imgSrc = swiperSlide.attr('data-src');
    fragment.appendChild(iframeEl);
    iframeEl.setAttribute('src', imgSrc);
    swiperSlide[0].appendChild(fragment);

    /*eslint-disable*/
    $(iframeEl).on('load', function () {
        console.log('inside of load');
        const self = $(this);
        self.parents('.swiper-slide').attr('loaded-element', true);
        window.setTimeout(function () {
            self.prevAll('.spinner').addClass('hidden');
        }, 800);
        window.setTimeout(function () {
            self.parents('.swiper-slide').addClass(visibleDescriptionClass);
        }, 4000);
    });
    /*eslint-enable */
};

export default iframeLoadingFunction;