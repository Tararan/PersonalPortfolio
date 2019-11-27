const collapseToIconFunction = function () {
    const iconAnimated = 'desktop__files-icon-image--collapsed';
    const collapseWindowsClass = 'app--animate-collapse';
    const closeWindow = $('.window__toolbar-buttons-close');
    const openWindowsClass = 'app--animate-opening';
    const app = $('.desktop__files-icon');
    const header = $('.header');

    closeWindow.on('click', function () {
        const self = $(this);
        const selfClassList = self.parents('.app')[0].classList[1];
        const appNameString = selfClassList.split('--')[1];
        const appIconImg = $(`.desktop__files-icon--${appNameString}`);
        self.parents('.app').removeClass(openWindowsClass).addClass(collapseWindowsClass);
        appIconImg.addClass(iconAnimated);
    });

    app.on('click', function () {
        const $activeApp = $('.app.app--animate-opening');
        app.removeClass(iconAnimated);
        if ($activeApp.length) {
            const activeElementClassString = $activeApp.attr('class').split(' ')[1];
            const activeAppName = activeElementClassString.split('--')[1];
            const activeAppIcon = $(`.desktop__files-icon--${activeAppName}`);
            activeAppIcon.addClass(iconAnimated).siblings().removeClass(iconAnimated);
        }
        const self = $(this);
        const selfIconClassList = self[0].classList[1];
        const appIconNameString = selfIconClassList.split('--')[1];
        const currentAppWindow = $(`.app--${appIconNameString}`);
        currentAppWindow.removeClass(collapseWindowsClass).addClass(openWindowsClass)
            .siblings('.app').removeClass(openWindowsClass).addClass(collapseWindowsClass);
    });

    // Closing header window
    $('body').on('keyup', function () {
        header.addClass('hidden');
    });
};

export default collapseToIconFunction;