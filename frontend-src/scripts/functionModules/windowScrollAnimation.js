const windowScrollAnimation = function () {
    const windowEl = $('.app--cv .window-wrapper').not('.window-wrapper--contact');
    const CV = $('.app--cv');
    const desktopIcon = $('.desktop__files-icon--cv');
    const closeCVWindows = $('.window__toolbar-buttons, .desktop__files-icon').not('.desktop__files-icon--cv');
    const windowFixedClass = 'window-wrapper--fixed';
    const windowTransparencyClass = 'window-wrapper--transparency';
    const topMargin = 40;
    const animationDuration = 500;
    let windowElHeightArray = [];
    let snapPoints = [];

    // Resetting positions

    $('html, body').animate({
        scrollTop: 0
    }, animationDuration);
    setTimeout(function () {
        $(windowEl).not('.window-wrapper--header').removeClass(windowFixedClass);
    }, 100);

    cardStacking();
    transparencySwitch();

    closeCVWindows.on('click', function () {
        window.removeEventListener('scroll', function () {
            cardStacking();
            transparencySwitch();
        });
    });

    if (CV.hasClass('app--animate-opening')) {
        window.addEventListener('scroll', function () {
            cardStacking();
            transparencySwitch();
        });
    }

    desktopIcon.on('click', function () {
        window.addEventListener('scroll', function () {
            cardStacking();
            transparencySwitch();
        });
    });

    function cardStacking() {
        const scrollBarPosition = window.pageYOffset;
        const scrollbarAnimationHelper = parseInt((scrollBarPosition / 100));
        let j = windowEl.length;
        for (let i = 0; i < windowEl.length; i++) {
            j = j - 1;
            // Calculations for smooth transitions
            const opacityTransition = 1 - (j * (4 * scrollbarAnimationHelper) / (windowEl[j].getBoundingClientRect().bottom));

            const el = windowEl[i];
            const elNext = el.nextElementSibling;
            const lastSnapPoint = snapPoints[i - 1];
            const scrollBarSnapPoint = scrollBarPosition + (topMargin * i);
            const lastElement = (windowEl.length - 1);

            el.setAttribute('data-id', i);
            const dataId = Number(el.getAttribute('data-id'));
            windowElHeightArray[i] = el.clientHeight + topMargin;
            if (i === 0) {
                snapPoints[i] = parseFloat(windowElHeightArray[i]);
            } else {
                snapPoints[i] = parseFloat(snapPoints[i - 1] + windowElHeightArray[i]);
            }
            // FIRST ELEMENT
            if (dataId === 0 && (scrollBarPosition >= topMargin && (scrollBarPosition + (topMargin)) < snapPoints[0])) {
                elNext.classList.remove(windowFixedClass);
                el.nextElementSibling.nextElementSibling.style.marginTop = topMargin + 'px';
            }
            // OTHER ELEMENTS
            else if (dataId > 0 && dataId < lastElement && scrollBarSnapPoint > lastSnapPoint && scrollBarSnapPoint <= snapPoints[i]) {
                el.classList.add(windowFixedClass);
                elNext.style.marginTop = snapPoints[i] + topMargin + 'px';
                elNext.classList.remove(windowFixedClass);
                elNext.removeAttribute('snappedToPosition');

                // Checking if element is part of the window-wrapper group before adding margin and stylings
                if (el.nextElementSibling.nextElementSibling && el.nextElementSibling.nextElementSibling.classList.contains('window-wrapper')) {
                    el.nextElementSibling.nextElementSibling.style.marginTop = topMargin + 'px';
                    el.nextElementSibling.nextElementSibling.removeAttribute('snappedToPosition');
                }
            }
            // LAST ELEMENT 
            else if ((dataId === lastElement && scrollBarSnapPoint > lastSnapPoint && scrollBarSnapPoint <= snapPoints[i])) {
                el.classList.remove(windowFixedClass);
                el.setAttribute('snappedToPosition', true);
                // windowEl[lastElement].style.setProperty('transform', `translateY(${topMargin * (i+1)}px)`);
            }

            windowEl[lastElement].style.setProperty('top', `${topMargin * (i+1)}px`);
            // Adding top spacing for elements to stack properly
            if (el.classList.contains(windowFixedClass)) {
                el.style.setProperty('top', `${topMargin * i}px`);
            }
            // Adding opacity animation on scroll
            if (el.classList.contains(windowTransparencyClass)) {
                const transparentEl = document.getElementsByClassName(windowTransparencyClass)[i];
                if (transparentEl) {
                    transparentEl.style.setProperty('opacity', `${opacityTransition}`);
                }
            } else {
                el.style.removeProperty('opacity');
            }
        }
    }

    function transparencySwitch() {

        const windowFixedEl = document.getElementsByClassName(windowFixedClass);
        for (let i = 0; i < windowFixedEl.length; i++) {
            const fixedEl = windowEl[i];
            const elAfterFixed = fixedEl.nextElementSibling;

            if (fixedEl.nextElementSibling.classList.contains(windowFixedClass)) {
                fixedEl.classList.add(windowTransparencyClass);
            }
            if (!fixedEl.nextElementSibling.classList.contains(windowFixedClass)) {
                fixedEl.classList.remove(windowTransparencyClass);
            }
            if (elAfterFixed.getAttribute('snappedToPosition')) {
                fixedEl.classList.add(windowTransparencyClass);
            }
        }
    }
};

export default windowScrollAnimation;