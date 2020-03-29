import paper from 'paper';
// import paperScope from 'paper';

const manipulateImagesFunction = function () {
    // Create a raster item using the image tag with id='mona'
    // const img = document.getElementById('img');
    const canvas = document.getElementById('paperjs-canvas');
    paper.setup(canvas);
    // paper.install(window);
    // Create a raster item using the image tag with id='mona'
    const raster = new paper.Raster('img');

    // Move the raster to the center of the view
    /*     raster.position = paper.view.center;
    
        // Create a circle shaped path at {x: 50, y: 50}
        // with a radius of 30:
        const path = new paper.Path.Circle({
            center: [50, 50],
            radius: 30,
            strokeColor: 'white'
        });
    
        canvas.addEventListener('mousemove', function (event) {
            // Set the fill color of the path to the average color
            // of the raster at the position of the mouse:
            console.log('%c > Color','color: yellow; font-size: medium');
            console.log(event);
            console.log(event);
            path.fillColor = raster.getAverageColor(event);
        }); */

    // Hide the raster:
    raster.visible = true;

    // The size of our grid cells:
    // const gridSize = 12;

    // Space the cells by 120%:
    // const spacing = 1.2;

    // As the web is asynchronous, we need to wait for the raster to load
    // before we can perform any operation on its pixels.
    raster.on('load', function () {
        // Since the example image we're using is much too large,
        // and therefore has way too many pixels, lets downsize it to
        // 40 pixels wide and 30 pixels high:
        // raster.size = new paper.Size(50, 50);

        const color = raster.getAverageColor(0, 0);
        console.log('> color');
        console.log(color);

        /*         for (let y = 0; y < raster.height; y++) {
                    for (let x = 0; x < raster.width; x++) {
                        // Get the color of the pixel:
                        const color = raster.getPixel(x, y);
                        // Create a circle shaped path:
                        const path = new paper.Path.Circle({
                            // center: new paper.Point(x, y) * gridSize,
                            radius: gridSize / 2 / spacing
                        });
        
                        // Set the fill color of the path to the color
                        // of the pixel:
                        path.fillColor = color;
                    }
                } */

        // Move the active layer to the center of the view, so all 
        // the created paths in it appear centered.
        // paper.project.activeLayer.position = paper.view.center;

    });

    // Move the active layer to the center of the view:
    // paper.project.activeLayer.position = paper.view.center;
};

export default manipulateImagesFunction;