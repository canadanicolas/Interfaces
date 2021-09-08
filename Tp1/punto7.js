var imageData = ctx.createImageData(height, width);

let imageScaledWidth = c.width;
let imageScaledHeight = c.height;

var imagen = new Image();
imagen.src = "imagenTest.png";   
var c = document.getElementById("canva4");
var ctx = c.getContext("2d"); 
imagen.onload = function(){
  ctx.drawImage(imagen, 0, 0);
  aplicarFiltroGrises(this);   
}

//Obtiene la cantidad de rojo del pixel
function getRed(imageData, x, y) {
  let index = (x + y * imageData.width) * 4;
  return imageData.data[index + 0];
  }
        
  //Obtiene la cantidad de verde del pixel
  function getGreen(imageData, x, y) {
  let index = (x + y * imageData.width) * 4;
  return imageData.data[index + 1];
  }
  
  //Obtiene la cantidad de azul del pixel
  function getBlue(imageData, x, y) {
  let index = (x + y * imageData.width) * 4;
  return imageData.data[index + 2];
  }

  //Aplica el filtro binario al canva
  function aplicarFiltroGrises() {
          let r;
          let b;
          let g;
          let imageData = ctx.getImageData(0, 0, c.width, c.height);
          for (let y = 0; y < imageData.height; y++) {
                  for (let x = 0; x < imageData.width; x++) {
                          let index = (x + y * imageData.width) * 4;
                          r = getRed(imageData, x, y);
                          g = getGreen(imageData, x, y);
                          b = getBlue(imageData, x, y);
                          let grey = (r + g + b) / 3;
                          imageData.data[index + 0] = grey;
                          imageData.data[index + 1] = grey;
                          imageData.data[index + 2] = grey;
                  }
          }
          ctx.putImageData(imageData, 0, 0);
  }
