var c = document.getElementById("canva3");
var ctx = c.getContext("2d");

var height = c.height;
var width = c.width;
var imageData = ctx.createImageData(height, width);

var x = 0;
var y = 0;
var a = 255;

var color = imageData;
var aux = 255;
var aux2 = 255;
const degradeMitad = 0.5;

drawRect(imageData, a);
ctx.putImageData(imageData, x, y) *4;

function drawRect(imageData, a){
    for(let x = 0; x < imageData.width; x++){
        for(let y = 0; y < imageData.height; y++){
            color.r = x/imageData.height * aux;
            color.g = x/imageData.height * aux2;
            color.b = x/imageData.height * 25;
          setPixel(imageData, x, y , color.r, color.g, color.b, a);
        }
        if(x >= imageData.width/2){
          aux2 = aux2 - degradeMitad;
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