const collapseToIconFunction = function () {
    /*eslint-disable*/
    const animationDuration = 250;
    const windowEl = $('.window-wrapper');
    const windowFixedClass = 'window-wrapper--fixed';
    const windowTransparencyClass = 'window-wrapper--transparency';
    const iconAnimated = 'desktop__files-icon-image--collapsed';
    const collapseWindowsClass = 'app--animate-collapse';
    const openWindowsClass = 'app--animate-opening';
    const CV = 'cv';
    const contact = 'contact';
    const portfolio = 'portfolio';
    const credits = 'credits';

    function openCloseApp(appName) {
        const app = $(`.app--${appName}`);
        const appSiblings = app.siblings('.app');
        const collapseWindows = app.find('.window__toolbar-buttons-close');
        const appIcon = $(`.desktop__files-icon--${appName}`);
        const appIconImg = appIcon.find('.desktop__files-icon-image');
        let windowFixedElement = $('.window-wrapper--fixed');

        function collapseWindowsAnimation(scrollPosition, scrollTime) {
            $('html, body').animate({
                scrollTop: scrollPosition,
            }, scrollTime);
        }
        // Animating into app
        collapseWindows.on('click', function () {
            windowFixedElement = $('.window-wrapper--fixed');
            let scrollDuration = parseInt(5 / windowFixedElement.length) * animationDuration;
            // let hiddenClassTiming = scrollDuration + 50;
            if ((appName === CV)) {
                collapseWindowsAnimation($(document).height(), scrollDuration);
                // collapseWindowsAnimation($(document).height(), scrollDuration);
                setTimeout(function () {
                    app.addClass('app--animate-helper');
                    app.addClass(collapseWindowsClass);
                    app.removeClass(openWindowsClass);
                    appIconImg.addClass(iconAnimated);
                }, scrollDuration);
                setTimeout(function () {
                    app.addClass('hidden');
                    app.removeClass('app--animate-helper');
                }, hiddenClassTiming);

            } else {
                app.addClass(collapseWindowsClass);
                app.removeClass(openWindowsClass);
                appIconImg.addClass(iconAnimated);
            }
        });
        // Animating opening
        appIcon.on('click', function () {
            /*eslint-disable*/
            console.log(app);
            /*eslint-enable*/
            app.removeClass('hidden');
            windowFixedElement = $('.window-wrapper--fixed');
            let scrollDuration = parseInt(5 / windowFixedElement.length) * animationDuration;
            app.removeClass(openWindowsClass);
            appIconImg.removeClass(iconAnimated);
            if (($('.app').hasClass(openWindowsClass))) {
                // Animating icons when window is closed
                const animationHelper = $('.app--animate-opening');
                const lastClosedEl = animationHelper[0].classList.value.split(' ')[1].split('--')[1];
                const appIconCollapse = $(`.desktop__files-icon--${lastClosedEl}`).find('.desktop__files-icon-image');
                if ((appName === CV)) {
                    setTimeout(function () {
                        appIconCollapse.addClass(iconAnimated);
                    }, scrollDuration / 5);
                } else {
                    setTimeout(function () {
                        appIconCollapse.addClass(iconAnimated);
                    }, scrollDuration);
                }
            }
            // Closing window if you click on CV icon
            // if ((appName === CV)) {
            //     appSiblings.addClass(collapseWindowsClass);
            //     appSiblings.removeClass(openWindowsClass);
            //     // appSiblingsIconImg.addClass(iconAnimated);
            //     setTimeout(function () {
            //         app.removeClass(collapseWindowsClass);
            //         app.addClass(openWindowsClass);
            //         windowEl.not('.window-wrapper--header').removeClass(windowFixedClass);
            //         windowEl.removeClass(windowTransparencyClass);
            //     }, scrollDuration / 5);
                // Closing CV window if you click on other icons
            // } 
            // else if (((appName !== CV) && $('.app--cv').hasClass(openWindowsClass))) {
            //     collapseWindowsAnimation($(document).height(), scrollDuration);
            //     // collapseWindowsAnimation($(document).height(), scrollDuration);
            //     setTimeout(function () {
            //         app.addClass('app--animate-helper');
            //         app.addClass(collapseWindowsClass);
            //         app.removeClass(openWindowsClass);
            //         appIconImg.addClass(iconAnimated);
            //     }, scrollDuration);
            //     setTimeout(function () {
            //         app.addClass('hidden');
            //         app.removeClass('app--animate-helper');
            //     }, hiddenClassTiming);
                // collapseWindowsAnimation($(document).height(), scrollDuration);
                // setTimeout(function () {
                //     appSiblings.addClass(collapseWindowsClass);
                //     app.removeClass(collapseWindowsClass);
                //     appSiblings.removeClass(openWindowsClass);
                //     app.addClass(openWindowsClass);
                // }, scrollDuration);
            // } 
            // else {
                appSiblings.addClass(collapseWindowsClass);
                app.removeClass(collapseWindowsClass);
                appSiblings.removeClass(openWindowsClass);
                app.addClass(openWindowsClass);
            // }
        });
    }

    openCloseApp(CV);
    openCloseApp(contact);
    openCloseApp(portfolio);
    openCloseApp(credits);
    /*eslint-enable*/

};

export default collapseToIconFunction;