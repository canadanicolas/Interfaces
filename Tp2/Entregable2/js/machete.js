"use strict";

 document.addEventListener("DOMContentLoaded", function () {

 let canvas = document.querySelector("#MyCanvas");
 let ctx = canvas.getContext("2d");


 ctx.beginPath();
ctx.rect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "rgba(255,255,255,1)";
ctx.fill();

 let pencil = false;
 let rubber = false;
 let isMouseDown = false;
 let draws = [];


let imageAspectRatio;
let imageScaledWidth;
let imageScaledHeight;


 function loadImage(){
    let image = new Image();
    image.src = "../img/precargada.png";
    image.onload = function () {
            if (this.width > this.height) {
                    imageAspectRatio = (1.0 * this.height) / this.width;
                    imageScaledWidth = canvas.width;
                    imageScaledHeight = canvas.width * imageAspectRatio;
            } else {
                    imageAspectRatio = (1.0 * this.width) / this.height;
                    imageScaledWidth = canvas.height;
                    imageScaledHeight = canvas.height * imageAspectRatio;
            }
            ctx.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight); 
    }
}



function addDrawPoint(x,y){
    let color = getColor();
    let size = getSize();
    let posX = x;
    let posY = y;
    if(pencil){
        var drawPoint = new dibujo(posX,posY,color,size,ctx);
    }else if (rubber){
        var drawPoint = new dibujo(posX,posY,"white",size,ctx);
    }
    draws.push(drawPoint);
    drawing();
}

    function drawing(){ 
        for (let i=0; i< draws.length; i++){
            draws[i].draw();
        }
    }
    


function getColor(){
    let color = colorSelector.value;
    return color;
}

function getSize(){
    let size = sizeSelector.value;
        return size;
}

function onmousedown(e){
    let x = e.layerX;
    let y = e.layerY;
    isMouseDown = true;
    addDrawPoint(x,y);
}


function onmouseup(){
   isMouseDown= false;
}

function onmousemove(e){
    let x = e.layerX;
    let y = e.layerY;
    if(isMouseDown){
        addDrawPoint(x,y);
    }
}


 function clearCanvas(){
     ctx.fillStyle = "white";
     ctx.fillRect(0,0,canvas.width,canvas.height);
 }

 







//SELECCION DE LAPIZ Y GOMA ////////////////////
let pencilSelection = document.querySelector("#pencil");
pencilSelection.addEventListener("click",pencilSelect);
let rubberSelection = document.querySelector("#rubber");
rubberSelection.addEventListener("click",rubberSelect);
let colorSelector = document.querySelector("#colorSelect");
colorSelector.addEventListener("input",getColor);
let sizeSelector = document.querySelector("#sizeSelect");
sizeSelector.addEventListener("input",getSize);
let imageLoader =  document.querySelector("#imageLoader");
imageLoader.addEventListener("click",loadImage);


function pencilSelect(){
    pencil = true;
    rubber = false;
}
function rubberSelect(){
    pencil = false;
    rubber = true;
}
//////////////////////////////////////////////


canvas.addEventListener("mousedown", onmousedown, false);
canvas.addEventListener("mouseup", onmouseup, false);
canvas.addEventListener("mousemove", onmousemove,false);



})
