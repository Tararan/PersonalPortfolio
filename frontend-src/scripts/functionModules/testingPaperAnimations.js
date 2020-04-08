// import paper from 'paper';
// import manipulateImagesFunction from './manipulateImages';

const testingPaperAnimationsFunction = function (imgID, paperEl, raster) {
    console.log('> testingPaperAnimationsFunction loaded!');
    console.log('%c > imgID in testingPaperAnimationsFunction', 'color: yellow; font-size: small');
    console.log('%c > ' + imgID + '', 'color: purple; font-size: small');
    console.log('%c > ' + paperEl + '', 'color: purple; font-size: small');
    console.log('%c > ' + raster + '', 'color: purple; font-size: small');
    // console.log('> canvas');
    // console.log(canvas);
    // const canvasEl = document.getElementById(`${canvas}`);
    // console.log('> canvasEl');
    // console.log(canvasEl);
    // paperEl.setup(canvasEl);
    const paper = paperEl;
    // console.log('> imgID');
    // console.log(imgID);
    // console.log('> paper');
    // console.log(paper);

    /*eslint-disable*/
    // Create a circle shaped path at the center of the view,
    // with a radius of 70:
    // let mainColor = 'red';
    // let secondaryColor = 'blue';
    let colorLeftTop = 'red';
    let colorRightTop = 'blue';
    let colorLeftCenter = 'purple';
    let colorRightCenter = 'purple';
    let colorCenter = 'purple';
    let colorLeftBtm = 'yellow';
    let colorRightBtm = 'green';

    // paper.setup(canvas);
    // paper.install(window);
    // const canvas = document.getElementById(canvasID);
    // paper.setup('myCanvas');
    // with (paper) {
    // console.log('> canvas');
    // console.log(canvas);
    // const raster = new paper.Raster(imgID);
    console.log('%c > raster', 'color: yellow; font-size: small');
    console.log('%c > ' + raster + '', 'color: yellow; font-size: small');
    raster.visible = false;
    // paper.project.activeLayer.position = paper.view.center;

    console.log('> paper.view.size');
    console.log(paper.view.size);

    const topPos = 0;
    const leftPos = paper.view.size.width / 3;
    const centerLeftPos = paper.view.size.width / 2;
    const centerRightPos = paper.view.size.height / 2;
    const btmPos = paper.view.size.height;
    const rightPos = paper.view.size.width - (raster.size.width / 3);

    raster.on('load', function () {
        // console.log('%c > raster', 'color: yellow; font-size: medium');
        // console.log(raster);
        // Since the example image we're using is much too large,
        // and therefore has way too many pixels, lets downsize it to
        // 40 pixels wide and 30 pixels high:
        raster.size = new paper.Size(50, 50);
        // console.log('raster.size');
        // console.log(raster.size.width / 2);
        // const srcLeftPos = 0;
        const srcLeftPos = raster.size.width / 4;
        const srcRightPos = raster.size.width - (raster.size.width / 4);
        const srcCenterXPos = raster.size.width / 2;
        const srcCenterYPos = raster.size.height / 2;
        // const srcTopPos = 0;
        const srcTopPos = raster.size.height / 4;
        const srcBtmPos = raster.size.height - (raster.size.height / 4);

        let topColors = [];
        let btmColors = [];
        let centerColors = [];
        let leftColors = [];
        let rigthColors = [];
        const colorPickerSpacing = 5
        for (let i = 0; i < 10; i++) {
            topColors.push(raster.getPixel(i * colorPickerSpacing, srcTopPos));
            btmColors.push(raster.getPixel(i * colorPickerSpacing, srcBtmPos));
            (i % 2 === 0)
                ? centerColors.push(raster.getPixel(srcCenterXPos + i, srcCenterYPos + i))
                : centerColors.push(raster.getPixel(srcCenterXPos - i, srcCenterYPos - i));
            leftColors.push(raster.getPixel(srcLeftPos, i * colorPickerSpacing));
            rigthColors.push(raster.getPixel(srcRightPos, i * colorPickerSpacing));
        }

        // console.log('centerColors');
        // console.log(centerColors);
        colorLeftTop = raster.getPixel(srcLeftPos, srcTopPos);
        colorRightTop = raster.getPixel(srcRightPos, srcTopPos);
        colorLeftCenter = raster.getPixel(0, srcCenterYPos);
        colorCenter = raster.getPixel(srcCenterXPos, srcCenterYPos);
        colorRightCenter = raster.getPixel(srcCenterXPos, 0);
        colorLeftBtm = raster.getPixel(srcLeftPos, srcBtmPos);
        colorRightBtm = raster.getPixel(srcRightPos, srcBtmPos);

        // var rectangle = new Rectangle(new Point(20, 20), new Size(180, 60));

        const blob1 = new paper.Shape.Ellipse(new paper.Rectangle(new paper.Point(20, 20), new paper.Size(1000, 600)));

        // const blob1 = new paper.Path();

        // console.log('> blob1.view.bounds');
        // console.log(blob1.view.bounds);
        blob1.fillColor = {
            gradient: {
                stops: [
                    [centerColors[0], 0],
                    [centerColors[2], 0.35],
                    [centerColors[4], 0.5],
                    [centerColors[6], 0.75],
                    [centerColors[8], 1],
                ],
                radial: true
            },
            origin: [blob1.view.center.y, blob1.view.center.y],
            destination: blob1.view.bounds
        };

        // blob1.add(new paper.Point(100, 800));
        // blob1.add(new paper.Point(800, 100));
        // blob1.add(new paper.Point(600, 800));
        // blob1.closed = true;
        blob1.position.x = paper.view.size.width;
        blob1.position.y = 0;
        // blob1.smooth();

        // const blob2 = new paper.Path();


        // Define a random point in the view, which we will be moving
        // the text item towards.
        let destinationX = paper.Point.random().x * paper.view.size.width;
        let destinationY = paper.Point.random().y * paper.view.size.height;

        // The leftBreakAmount of segment points we want to create:
        const leftBreakAmount = 8;
        const btmBreakAmount = 10;
        // The maximum height of the wave:
        const height = 100;
        // Create a new path and style it:
        const leftSin = new paper.Path();

        leftSin.fillColor = {
            gradient: {
                stops: [
                    [leftColors[0], 0],
                    [leftColors[1], 0.1],
                    [leftColors[2], 0.2],
                    [leftColors[3], 0.3],
                    [leftColors[4], 0.4],
                    [leftColors[5], 0.5],
                    [leftColors[6], 0.6],
                    [leftColors[7], 0.7],
                    [leftColors[8], 0.8],
                    [leftColors[9], 0.9]
                ],
                // radial: true,
            },
            origin: [0, 0],
            destination: [0, paper.view.size.height],
            strokeWidth: 30,
        }

        const btmSin = new paper.Path();

        btmSin.fillColor = {
            gradient: {
                stops: [
                    [btmColors[0], 0],
                    [btmColors[1], 0.1],
                    [btmColors[2], 0.2],
                    [btmColors[3], 0.3],
                    [btmColors[4], 0.4],
                    [btmColors[5], 0.5],
                    [btmColors[6], 0.6],
                    [btmColors[7], 0.7],
                    [btmColors[8], 0.8],
                    [btmColors[9], 0.9]
                ],
                // radial: true,
            },
            origin: [0, paper.view.size.height],
            destination: [paper.view.size.width, paper.view.size.height],
            strokeWidth: 30,
        }

        const topSin = new paper.Path({
            strokeColor: {
                gradient: {
                    stops: [
                        [topColors[0], 0],
                        [topColors[1], 0.1],
                        [topColors[2], 0.2],
                        [topColors[3], 0.3],
                        [topColors[4], 0.4],
                        [topColors[5], 0.5],
                        [topColors[6], 0.6],
                        [topColors[7], 0.7],
                        [topColors[8], 0.8],
                        [topColors[9], 0.9]
                    ]
                },
                origin: [0, 0],
                destination: [paper.view.size.width, 0]
            },
            strokeWidth: 200
        });

        topSin.add(new paper.Point(-40, -100));
        topSin.add(new paper.Point((paper.view.size.width / 2) - 400, 100));
        topSin.add(new paper.Point((paper.view.size.width / 2) - 200, 200));
        topSin.add(new paper.Point((paper.view.size.width / 2) - 0, paper.view.size.height / 2 - 400));
        topSin.add(new paper.Point((paper.view.size.width / 2) + 200, paper.view.size.height / 2));
        topSin.add(new paper.Point((paper.view.size.width / 2) + 400, paper.view.size.height / 2 + 400));
        topSin.add(new paper.Point(paper.view.size.width + 40, paper.view.size.height));

        // Add 5 segment points to the path spread out
        // over the width of the view:
        for (let i = 0; i <= leftBreakAmount; i++) {
            leftSin.add(new paper.Point(0, ((i / leftBreakAmount) * paper.view.size.height)));
        }
        for (let i = 0; i <= btmBreakAmount; i++) {
            btmSin.add(new paper.Point((i / btmBreakAmount * paper.view.size.width), paper.view.size.height));
        }

        leftSin.add(new paper.Point(0, paper.view.size.height));
        leftSin.add(new paper.Point(0, 0));
        leftSin.closed = true;
        btmSin.add(new paper.Point(paper.view.size.width, paper.view.size.height));
        btmSin.add(new paper.Point(0, paper.view.size.height));
        btmSin.closed = true;
        leftSin.closed = true;


        const blob2 = new paper.Path.Ellipse(new paper.Rectangle(new paper.Point(20, 20), new paper.Size(1000, 500)));
        blob2.fillColor = {
            gradient: {
                stops: [
                    [centerColors[1], 0],
                    [centerColors[3], 0.35],
                    [centerColors[5], 0.55],
                    [centerColors[7], 0.75],
                    [centerColors[9], 1],
                ],
                radial: true
            },
            origin: [blob1.view.center.y, blob1.view.center.y],
            destination: [btmPos, btmPos]
        };
        blob2.position.x = paper.view.size.width;
        blob2.position.y = paper.view.size.height;
        blob2.smooth();

        paper.view.onFrame = function (e) {
            // blob1.fillColor.hue -= 0.75;
            // leftSin.fillColor.hue -= 0.75;
            // topSin.strokeColor.hue -= 0.75;
            // blob2.fillColor.hue -= 0.75;
            for (let i = 0; i <= leftBreakAmount; i++) {
                const segment = leftSin.segments[i];
                const sinus = Math.sin(e.time * 1 + i);
                segment ? segment.point.x = sinus * (height + 125) + 225 : '';
                const segmentRight = topSin.segments[i];
                segmentRight ? segmentRight.point.y = sinus * (height + 200) + 160 : '';
            }
            for (let i = 0; i <= btmBreakAmount; i++) {
                const sinus = Math.sin(e.time * 1 + i);
                const segmentBtm = btmSin.segments[i];
                segmentBtm ? segmentBtm.point.y = paper.view.size.height - (sinus * (height + 100) + 200) : '';
            }

            leftSin.smooth();
            topSin.smooth();
            btmSin.smooth();
            blob2.rotate(0.5);
            blob1.rotate(0.75);

            // topSin.rotate(0.05);
            let destination = new paper.Point(destinationX, destinationY);
            let blob2Position = new paper.Point(blob2.position.x, blob2.position.y);
            const vector = new paper.Point(destination.x - blob2Position.x, destination.y - blob2Position.y);
            blob2.position.x += vector.x / 600;
            blob2.position.y += vector.y / 400;

            // console.log('vector.length');
            // console.log('> destination.x');
            // console.log(blob2.position.x);
            // blob1.view.size.width = blob1.view.size.width + (blob2.position.x / 1);
            if (vector.length < 50) {
                destinationX = paper.Point.random().x * paper.view.size.width;
                destinationY = paper.Point.random().y * paper.view.size.height;
                destination = new paper.Point(destinationX, destinationY);
            }
        };
    });
    /*eslint-enable*/
};

export default testingPaperAnimationsFunction;