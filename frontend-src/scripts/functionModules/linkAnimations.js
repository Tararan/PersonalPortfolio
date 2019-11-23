const linkComponents = function () {
    const link = $('.link__text');
    link.each(function () {
        const self = $(this);
        self.wrapAll('<a rel="noopener noreferer" target="_blank" class="link"></a>');
        const linkWrapper = self.parents('.link');

        const fragment = document.createDocumentFragment();
        const linkEffect = document.createElement('span');
        fragment.appendChild(linkEffect);
        linkEffect.classList.add('link__effect');
        linkEffect.innerHTML = self.text();
        linkWrapper.attr('href', self.attr('attr-href'));
        linkWrapper[0].appendChild(fragment);
    });
};

export default linkComponents;