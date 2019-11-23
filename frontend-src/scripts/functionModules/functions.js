'use strict';
/*eslint-disable*/

const positionStickySupported = CSS.supports(`(position: sticky) or (-moz-position: sticky) or
                       (-o-tposition: sticky) or (-webkit-position: sticky)`);
import swipersFunction from './swipers';
import windowScrollAnimation from './windowScrollAnimation';
import collapseToIconFunction from './collapseToIcon';
import loadingAnimationFunction from './loadingAnimation';
import calendarFunction from './calendar';
import switchOSFunction from './switchOS';
import portfolioDescriptionFunction from './portfolioDescription';
import linkComponents from './linkAnimations';

const functionsInit = function () {
    $(function () {
        if (!positionStickySupported) {
            windowScrollAnimation();
        }
        collapseToIconFunction();
        swipersFunction();
        loadingAnimationFunction();
        calendarFunction();
        switchOSFunction();
        portfolioDescriptionFunction();
        linkComponents();
    });
};
/*eslint-enable*/

export default functionsInit;