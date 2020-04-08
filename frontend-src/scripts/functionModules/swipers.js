import Swiper from 'swiper';
// import paper from 'paper';
import testingPaperAnimationsFunction from './testingPaperAnimations';
// import iframeLoadingFunction from './helpers/iframeLoading';

/*eslint-disable*/
const swipersFunction = function () {
    const tabSlide = $('.app--portfolio .window__toolbar--tabs .window__toolbar-text');
    // const activeTabClass = 'window__toolbar-text--active';

    const swiperEl = $('.swiper-container');
    swiperEl.each(function (index) {
        const self = $(this);
        self.addClass(`swiper-container-${index}`);

        const swiper = new Swiper('.swiper-container-' + index, {
            slidesPerView: 'auto',
            centeredSlides: true,
            loop: true,
            slideToClickedSlide: true
        });

        // const swiper = new Swiper('.swiper-container-1', {
        //     slidesPerView: 'auto',
        //     // direction: 'horizontal',
        //     slideToClickedSlide: true
        // }); 

        // tabSlide.on('click', function () {
        //     const self = $(this);
        //     const index = parseInt(self.attr('index'));
        //     swiper.slideTo(index, 250, false);
        // });
        const swiperSlide = swiper.$wrapperEl.find('.swiper-slide');


        swiperSlide.each(function (idx) {
            const index = idx + 1;
            const self = $(this);
            self.attr('index', index);
            $(tabSlide[index]).attr('index', self.attr('index'));
            const swiperSlideImg = self.find('.img');
            swiperSlideImg.attr('id', 'img-' + index);

        });

        const mypapers = [];
        let raster = [];
        mypapers[0] = new paper.PaperScope();
        mypapers[1] = new paper.PaperScope();

        mypapers[0].setup($('#active')[0]);
        mypapers[1].setup($('#next')[0]);
        // mypapers[0].setup($("#active")[0]);
        // mypapers[1].setup($("#active-transition")[0]);

        paper = mypapers[0];
        raster[0] = new paper.Raster('img-1');
        testingPaperAnimationsFunction('img-1', paper, raster[0]);
        paper = mypapers[1];
        raster[1] = new paper.Raster('img-2');
        testingPaperAnimationsFunction('img-2', paper, raster[1]);

        console.log('> swiper.$wrapperEl');
        console.log(swiper.$wrapperEl);

        if (swiper.isBeginning) {
            console.log('swiper!');
        }
        // swiper.$wrapperEl.on('ready', function () {
        //     console.log('loaded swiper');
        // })

        swiper.on('slideChange', function () {
            const mypapersSlide = [];
            mypapersSlide[0] = new paper.PaperScope();
            mypapersSlide[1] = new paper.PaperScope();
            mypapersSlide[0].setup(document.getElementById('active'));
            mypapersSlide[1].setup(document.getElementById('next'));

            // const tabActiveSlide = $(`.app--portfolio .window__toolbar--tabs .window__toolbar-text[index=${swiper.activeIndex}]`);
            // tabActiveSlide.addClass(activeTabClass).siblings().removeClass(activeTabClass);
            const activeSlide = $(`.swiper-slide[index=${swiper.activeIndex}]`);
            // const swiperSlideImg = $('.swiper-slide img');
            const activeSlideImg = activeSlide.find('.img');
            let nextSlideImg = activeSlide.next('.swiper-slide').find('.img');
            (nextSlideImg)
                ? nextSlideImg = activeSlide.next('.swiper-slide').find('.img')
                : nextSlideImg = activeSlideImg;

            const activeimgId = activeSlideImg.attr('id');
            const nextimgId = nextSlideImg.attr('id');

            $('#active').toggleClass('canvas--inactive');
            $('#next').toggleClass('canvas--inactive');

            // if (swiper.activeIndex % 2 === 0) {
            paper = mypapersSlide[0];
            // console.log('> nextimgId');
            // console.log(nextimgId);
            console.log('%c > activeimgId', 'color: red; font-size: small');
            console.log('%c > ' + activeimgId + '', 'color: purple; font-size: small');
            // console.log('%c > nextimgId', 'color: red; font-size: small');
            // console.log('%c > ' + nextimgId + '', 'color: red; font-size: small');
            // raster[0] = new paper.Raster(activeimgId);
            raster[0] = new paper.Raster(activeimgId);
            console.log('%c > raster[0]', 'color: red; font-size: small');
            console.log('%c > ' + raster[0] + '', 'color: purple; font-size: small');
            testingPaperAnimationsFunction(activeimgId, paper, raster[0]);

            // paper = mypapers[1];
            // raster[1] = new paper.Raster(nextimgId);
            // testingPaperAnimationsFunction(nextimgId, paper, raster[1]);
            // } else {

            // console.log('> activeimgId');
            // console.log(activeimgId);
            // }
            //     if (activeSlideData !== 'true') {
            //         iframeLoadingFunction(swiper.activeIndex);
            //     }
            //     activeSlide.attr('data-active', true);
        });
    });

    /*eslint-enable*/
};

export default swipersFunction;