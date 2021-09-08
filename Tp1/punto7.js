var imageData = ctx.createImageData(height, width);

let imageScaledWidth = c.width;
let imageScaledHeight = c.height;

var imagen = new Image();
imagen.src = "imagenTest.png";   
var c = document.getElementById("canva4");
var ctx = c.getContext("2d"); 
imagen.onload = function(){
  //ctx.drawImage(imagen, 0, 0);
  aplicarFiltroGrises(this);   
}

function getRed(imageData, x, y) {
  let index = (x + y * imageData.width) * 4;
  return imageData.data[index + 0];
}

function getGreen(imageData, x, y) {
  let index = (x + y * imageData.width) * 4;
  return imageData.data[index + 1];
}

function getBlue(imageData, x, y) {
  let index = (x + y * imageData.width) * 4;
  return imageData.data[index + 2];
}

function aplicarFiltroGrises() {
  let r;
  let b;
  let g;
  let imageData = ctx.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
  for (let y = 0; y < c.height; y++) {
          for (let x = 0; x < c.width; x++) {
                  let index = (x + y * imageData.width) * 4;
                  r = getRed(imageData, x, y);
                  g = getGreen(imageData, x, y);
                  b = getBlue(imageData, x, y);
                  let promedio = (r + g + b) / 3;
                  imageData.data[index + 0] = promedio;
                  imageData.data[index + 1] = promedio;
                  imageData.data[index + 2] = promedio;
                  imageData.data[index + 3] = 255;
          }
  }
  ctx.putImageData(imageData, 0, 0);
}
