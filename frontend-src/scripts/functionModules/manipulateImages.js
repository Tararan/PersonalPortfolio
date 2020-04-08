import paper from 'paper';
// import paperScope from 'paper';

const manipulateImagesFunction = function () {
    // Create a raster item using the image tag with id='mona'
    // const img = document.getElementById('img');
    const canvas = document.getElementById('paperjs-canvas');
    paper.setup(canvas);
    // paper.install(window);
    // Create a raster item using the image tag with id='mona'
    // const raster = new paper.Raster('img');

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
        raster.size = new paper.Size(50, 50);

        const colorLeftTop = raster.getAverageColor(0, 0);
        const colorRightTop = raster.getAverageColor(paper.view.size.width, 0);
        const colorCenter = raster.getAverageColor(paper.view.size.width / 2, paper.view.size.height / 2);
        const colorLeftBtm = raster.getAverageColor(0, paper.view.size.height);
        const colorRightBtm = raster.getAverageColor(paper.view.size.width, paper.view.size.height);

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