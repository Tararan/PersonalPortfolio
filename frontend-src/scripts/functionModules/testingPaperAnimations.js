import paper from 'paper';


const testingPaperAnimationsFunction = function () {
    // Create a circle shaped path at the center of the view,
    // with a radius of 70:
    const mainColor = 'red';
    const secondaryColor = 'blue';
    const canvas = document.getElementById('paper-src');
    paper.setup(canvas);
    paper.install(window);

    const blob1 = new paper.Path();
    blob1.fillColor = mainColor;
    blob1.add(new paper.Point(100, 800));
    blob1.add(new paper.Point(800, 100));
    blob1.add(new paper.Point(600, 800));
    blob1.closed = true;
    blob1.position.x = paper.view.size.width;
    blob1.position.y = 0;
    blob1.smooth();

    const blob2 = new paper.Path();
    blob2.fillColor = mainColor;
    blob2.add(new paper.Point(100, 700));
    blob2.add(new paper.Point(700, 100));
    blob2.add(new paper.Point(600, 700));
    blob2.closed = true;
    blob2.position.x = paper.view.size.width;
    blob2.position.y = paper.view.size.height;
    blob2.smooth();

    // Define a random point in the view, which we will be moving
    // the text item towards.
    let destinationX = paper.Point.random().x * paper.view.size.width;
    let destinationY = paper.Point.random().y * paper.view.size.height;

    // The amount of segment points we want to create:
    const amount = 8;
    // The maximum height of the wave:
    const height = 100;
    // Create a new path and style it:
    const leftSin = new paper.Path({
        strokeWidth: 30,
        fillColor: mainColor,
    });
    const rightSin = new paper.Path({
        strokeColor: secondaryColor,
        // fillColor: mainColor,
        strokeWidth: 400
    });
    rightSin.add(new paper.Point(-40, -100));
    rightSin.add(new paper.Point((paper.view.size.width / 2) - 400, 100));
    rightSin.add(new paper.Point((paper.view.size.width / 2) - 200, 200));
    rightSin.add(new paper.Point((paper.view.size.width / 2) - 0, 200));
    rightSin.add(new paper.Point((paper.view.size.width / 2) + 200, 200));
    rightSin.add(new paper.Point((paper.view.size.width / 2) + 400, 100));
    rightSin.add(new paper.Point(paper.view.size.width + 40, 100));
    rightSin.fullySelected = true;

    // Add 5 segment points to the path spread out
    // over the width of the view:
    for (let i = 0; i <= amount; i++) {
        leftSin.add(new paper.Point(0, ((i / amount) * paper.view.size.height)));
    }
    // rightSin.add(new paper.Point(paper.view.size.width, paper.view.size.height));

    leftSin.add(new paper.Point(0, paper.view.size.height));
    leftSin.add(new paper.Point(0, 0));
    leftSin.closed = true;
    // rightSin.closed = true;

    paper.view.onFrame = function (e) {
        // blob1.fillColor.hue -= 0.75;
        // leftSin.fillColor.hue -= 0.75;
        // rightSin.strokeColor.hue -= 0.75;
        for (let i = 0; i <= amount; i++) {
            const segment = leftSin.segments[i];
            const sinus = Math.sin(e.time * 1 + i);
            segment ? segment.point.x = sinus * height + 120 : '';
            const segmentRight = rightSin.segments[i];
            segmentRight ? segmentRight.point.y = sinus * (height + 100) + 160 : '';
        }
        leftSin.smooth();
        rightSin.smooth();
        blob2.fillColor.hue -= 0.75;
        blob2.rotate(0.5);
        blob1.rotate(0.75);
        rightSin.rotate(2);
        let destination = new paper.Point(destinationX, destinationY);
        let blob2Position = new paper.Point(blob2.position.x, blob2.position.y);
        const vector = new paper.Point(destination.x - blob2Position.x, destination.y - blob2Position.y);
        blob2.position.x += vector.x / 600;
        blob2.position.y += vector.y / 400;

        if (vector.length < 50) {
            destinationX = paper.Point.random().x * paper.view.size.width;
            destinationY = paper.Point.random().y * paper.view.size.height;
            destination = new paper.Point(destinationX, destinationY);
        }
    };
};

export default testingPaperAnimationsFunction;