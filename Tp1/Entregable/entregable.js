"use strict"

document.addEventListener("DOMContentLoaded", function () {
        let c = document.querySelector("#canvas");
        let ctx = c.getContext("2d");
        let pencil = false;
        let eraser = false;
        let active;
        let coordinates1;
        let coordinates2;
        let imageAspectRatio;
        let imageScaledWidth;
        let imageScaledHeight;
        let oldImage;
        let color = "#000000";
        ctx.beginPath();
        ctx.rect(0, 0, c.width, c.height);
        ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.fill();

        //Cambia el lapiz
        document.querySelector("#buttonPencil").addEventListener("click", function () {
                if (pencil) {
                        pencil = false;
                }
                else {
                        pencil = true;
                        eraser = false;
                }
        });

        //Cambia la goma
        document.querySelector("#buttonEraser").addEventListener("click", function () { 
                if (eraser) {
                        eraser = false;
                }
                else {
                        eraser = true;
                        pencil = false;
                }
        });

        //Activa el pintar con el mouse
        c.addEventListener("mousedown", function () {
                active = true;
        });

        //Activa pintar con el mouse desde un click
        c.addEventListener("mousedown", mouseClick);

        //Deja de pintar cuando se suelta el click
        c.addEventListener("mouseup", function () {
                active = false;
        });

        //Activa el pintar en la canva cuando se hace un click
        function mouseClick() {                
                if (active) {
                        coordinates1 = getCoordinates(event);
                        canvas.addEventListener("mousemove", function () {
                                draw(ctx, event);
                        })
                }
        }

        //Funcion de pintar con el lapiz o goma
        function draw(ctx, event) {             
                if ((pencil || eraser) && (active)) {
                        coordinates2 = getCoordinates(event);
                        ctx.lineWidth = 3;
                        if (eraser)
                                ctx.strokeStyle = "#ffffff";
                        else {
                                color = document.querySelector("#colorPicker").value;
                                ctx.strokeStyle = color;
                        }
                        ctx.beginPath();
                        ctx.moveTo(coordinates1.x, coordinates1.y);
                        ctx.lineTo(coordinates2.x, coordinates2.y);
                        ctx.stroke();
                        coordinates1 = coordinates2;
                }
        }

        //Da las coordenadas del puntero para pintar
        function getCoordinates(event) {        
                return {
                        x: event.clientX,
                        y: event.clientY
                };
        }

        //Carga de archivos para poner el la canva
        document.querySelector("#buttonFile").addEventListener("click", function () {
                //cambiar a guardar archivos dinamicamente
                let imagen = new Image();
                imagen.src = "imagenTest.png";
                imagen.onload = function () {
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
        })


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
        document.querySelector("#buttonBinary").addEventListener("click", applyBinaryFilter);
        function applyBinaryFilter() {
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

        //Aplica el filtro negativo
        document.querySelector("#buttonNegative").addEventListener("click", applyNegativeFilter);
        function applyNegativeFilter() {
                let index;
                let imageData = ctx.getImageData(0, 0, c.width, c.height);
                for (let x = 0; x < imageData.width; x++) {
                        for (let y = 0; y < imageData.height; y++) {
                                index = (x + y * imageData.width) * 4;
                                let r = 255 - getRed(imageData, x, y);
                                let g = 255 - getGreen(imageData, x, y);
                                let b = 255 - getBlue(imageData, x, y);
                                imageData.data[index + 0] = r;
                                imageData.data[index + 1] = g;
                                imageData.data[index + 2] = b;
                        }
                }
                ctx.putImageData(imageData, 0, 0);
        }

        document.querySelector("#buttonSepia").addEventListener("click", getSepia);
        function getSepia() {
                let index;
                let pixel;
                let imageData = ctx.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
                for (let x = 0; x < imageData.width; x++) {
                        for (let y = 0; y < imageData.height; y++) {
                                index = (x + y * imageData.width) * 4;
                                pixel = 0.3 * getRed(imageData, x, y) + 0.6 * getGreen(imageData, x, y) + 0.1 * getBlue(imageData, x, y);
                                let r = Math.min(pixel + 35, 255);
                                let g = Math.min(pixel + 20, 255);
                                let b = pixel;
                                imageData.data[index + 0] = r;
                                imageData.data[index + 1] = g;
                                imageData.data[index + 2] = b;
                        }
                }
                ctx.putImageData(imageData, 0, 0);
        }
})