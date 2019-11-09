const switchOSFunction = function () {
    const classicOSClass = 'classic-UI';
    const body = $('body');
    const classicOS = $('.js-classic');
    const modernOS = $('.js-modern');

    classicOS.on('click', function () {
        body.addClass(classicOSClass);
    });
    
    modernOS.on('click', function () {
        body.removeClass(classicOSClass);
    });
};
export default switchOSFunction;