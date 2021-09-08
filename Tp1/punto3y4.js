var c = document.getElementById("canva2");
var ctx = c.getContext("2d");

var height = c.height;
var width = c.width;
var imageData = ctx.createImageData(height, width);

var x = 0;
var y = 0;
var a = 255;

drawRect(imageData, a);
ctx.putImageData(imageData, x, y) *4;

function drawRect(imageData, a){
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let color = ((y * 255) / height);
            setPixel(imageData, x, y, color, color, color, a);
        }
    }
}

function setPixel(imageData, x, y, r, g, b, a){
    let index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}

