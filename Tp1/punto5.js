var c = document.getElementById("canva3");
var ctx = c.getContext("2d");

var height = c.height;
var width = c.width;
var imageData = ctx.createImageData(height, width);

var r = 0;
var g = 0;
var b = 0;
var a = 255;
var coeficiente = 255 / (width / 2);

drawRect(imageData, r, g, b, a);
ctx.putImageData(imageData, x, y) *4;

function drawRect(imageData, r, g, b, a){
    for(let x = 0; x < width; x++){
      let t, g, b;
      if (x  < width / 2) {
        r = coeficiente * x;
        g = coeficiente * x;
        b = 0;
      }

      else {
        r = coeficiente * x;
        g = g - coeficiente;
        b = 0;
      }
      for (let y = 0; y < height; y++) {
        setPixel(imageData,x,y,r,g,b,a)
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