const loadingAnimationFunction = function () {
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

    const loadingElements = (isFirefox === true) ? $($('.app--portfolio iframe')[0]) : $('.app--portfolio iframe');
    const bar = $('.loading-screen__bar');
    let loadedElCount = 0;
    let loadingProgress = 0;
    const loadingCircleOffset = -135;
    let loadingProgressCircle = loadingCircleOffset;
    let loadedPrevCount = -1;
    const leftCircleHalf = $('.loading-screen__loader-circle-fill--left');
    const rightCircleHalf = $('.loading-screen__loader-circle-fill--right');
    const loadingScreen = $('.loading-screen');

    loadingElements.each(function (index) {
        const self = $(this);
        const countEl = loadingElements.length;
        self.attr('loaded-data', parseInt((index / countEl) * 100));

        self.on('load', function () {
            const self = $(this);
            self.attr('loaded', true);
            loadedElCount += 1;
            loadedPrevCount += 1;
            self.attr('loaded-order', loadedElCount);
            const completelyLoaded = parseInt((loadedPrevCount / countEl) * 100);
            const loadingInfo = parseInt((loadedElCount / countEl) * 100);

            const completelyLoadedCircle = parseInt(((loadedPrevCount / countEl) * (360)) + loadingCircleOffset);
            const loadingInfoCircle = parseInt(((loadedElCount / countEl) * (360)) + loadingCircleOffset);

            loadingProgress = completelyLoaded;
            loadingProgressCircle = completelyLoadedCircle;

            // Loading Circle
            const intervalCircle = setInterval(function () {
                loadingProgressCircle++;
                // Info for circular loading
                if (loadingProgressCircle < (180 + loadingCircleOffset)) {
                    rightCircleHalf.length ? rightCircleHalf[0].style.setProperty('transform', `rotate(${loadingProgressCircle}deg)`) : '';
                    leftCircleHalf.length ? leftCircleHalf[0].style.setProperty('transform', `rotate(${loadingCircleOffset}deg)`) : '';

                } else {
                    const leftCircleOffset = loadingCircleOffset + loadingProgressCircle - 45;
                    leftCircleHalf.length ? leftCircleHalf[0].style.setProperty('transform', `rotate(${leftCircleOffset}deg)`) : '';
                    rightCircleHalf.length ? rightCircleHalf[0].style.setProperty('transform', 'rotate(45deg)') : '';
                }
                if (loadingProgressCircle >= loadingInfoCircle) {
                    clearInterval(intervalCircle);
                }
            }, 15);

            // Loading bar
            const intervalBar = setInterval(function () {
                if (loadingProgress === 100) {
                    $('body').removeClass('prevent-scrolling');
                    loadingScreen.removeClass('loading-screen--half-loaded');

                    loadingScreen.addClass('loading-screen--loaded');
                }

                if (loadingProgress === 50) {
                    loadingScreen.addClass('loading-screen--half-loaded');
                }

                loadingScreen.attr('loading', loadingProgress);
                bar.length ? bar[0].style.setProperty('width', loadingProgress + '%') : '';
                if (loadingProgress >= loadingInfo) {
                    clearInterval(intervalBar);
                }
                loadingProgress++;
            }, 50);

        });
    });
};

export default loadingAnimationFunction;