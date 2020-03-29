import StackBlurFunction from './helpers/StackBlur';
// sourceImageID, targetCanvasID, radius, blurAlphaChannel

const renderingUploadedImgComponent = function () {
    const imgUpload = $('.window__content-image-upload input[type="file"]');
    const imgOriginal = document.getElementById('uploaded');
    /*eslint-disable*/
    // const imgOriginal = $('#uploaded');
    // const img = $('.js-upload');
    // const destination = $('.window__content-image-upload-canvas');
    imgUpload.on('change', (e) => {
        const selectedFile = e.target.files[0];
        console.log('selectedFile');
        console.log(selectedFile);
        // img.attr('title', selectedFile.name);
        imgOriginal.src = URL.createObjectURL(selectedFile);

        /*eslint-disable*/
        imgOriginal.onload = function () {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            const imgHeight = imgOriginal.getBoundingClientRect().height;
            const imgWidth = imgOriginal.getBoundingClientRect().width;
            imgOriginal.setAttribute('size', `${imgHeight}-${imgWidth}`);
            
            ctx.filter = 'blur(50px)';
            ctx.drawImage(imgOriginal, 0, 0, imgWidth, imgHeight);
            StackBlurFunction('imgOriginal', 'canvas', 20, 1);

            // const img1 = loadImage(imgData, main(filter));
            // const img2 = loadImage(imgData, main);

            // var imagesLoaded = 0;
            // function main() {
            //     imagesLoaded += 1;
            //     if (imagesLoaded === 2) {
            //         // composite now
            //         ctx.drawImage(img1, 0, 0);
            //         ctx.globalAlpha = 0.5;
            //         ctx.drawImage(img2, 0, 0);
            //     }
            // }

            // function loadImage(src, onload) {
            //     // http://www.thefutureoftheweb.com/blog/image-onload-isnt-being-called
            //     var img = new Image();
            //     img.onload = onload;
            //     img.src = src;
            //     return img;
            // }
        };
        // reader.readAsDataURL(selectedFile);
    });
    /*eslint-enable*/


    // imgOriginal.on('load', () => {
    // const normalImg = $('.window__content-image-upload-img');
    // const styledlImg = $('.window__content-image-upload-img-shadow');
    // const canvas = document.getElementById('canvas');

    // const img1 = new Image();
    // img1.src = normalImg.attr('src');
    // img1.onload = () => {
    //     ctx.drawImage(img1, 0, 0);
    // };

    // const img2 = new Image();
    // img2.src = styledlImg.attr('src');
    // img2.onload = () => {
    //     ctx.drawImage(img2, 0, 0);
    // };

    // const srcImg = canvas.toDataURL('image/png');
    // const imgElement = document.createElement('img');
    // imgElement.setAttribute('src', srcImg);

    // console.log('imgElement');
    // console.log(imgElement);
    // destination.append(imgElement);
    /*eslint-enable*/
    // });

};
export default renderingUploadedImgComponent;