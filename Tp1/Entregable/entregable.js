"use strict"

document.addEventListener("DOMContentLoaded", function () {
        //Seteo canva
        let c = document.querySelector("#canvas");
        let ctx = c.getContext("2d");

        //Path de pintado de la canva
        ctx.beginPath();
        ctx.rect(0, 0, c.width, c.height);
        ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.fill();

        /*----------------------------------------------- Punto 1 -----------------------------------------------*/

        //Declaracion de variables para el punto 1
        let pencil = false;
        let eraser = false;
        let active;
        let coordinates1;
        let coordinates2;
        
        //Cambia el lapiz
        document.querySelector("#pencil").addEventListener("click", function () {
                if (pencil) {
                        pencil = false;
                }
                else {
                        pencil = true;
                        eraser = false;
                }
        });

        //Cambia la goma
        document.querySelector("#eraser").addEventListener("click", function () { 
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
                let color = "#000000";          
                if ((pencil || eraser) && (active)) {
                        coordinates2 = getCoordinates(event);
                        ctx.lineWidth = 3;
                        if (eraser)
                                ctx.strokeStyle = "#ffffff";
                        else {
                                color = document.querySelector("#colorSelector").value;
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
                        x: (event.clientX - 15), //15px de padding y margins 
                        y: (event.clientY - 15)  //15px de padding y margins
                };
        }

        /*----------------------------------------------- Punto 2 -----------------------------------------------*/
        
        //Declaracion de variables para el punto 2
        let imageAspectRatio;
        let imageScaledWidth;
        let imageScaledHeight;
        let originalImage;

        //Carga de archivos para poner el la canva
        
        let input = document.querySelector('.file');
                input.onchange = e => {
                        newCanvas();
                        let file = e.target.files[0];
                        let reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = readerEvent => {
                                let content = readerEvent.target.result;
                                let image = new Image();
                                image.src = content;
                                image.onload = function () {
                                        originalImage = image;
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
                }

        //Limpia la canva y carga la imagen original de nuevo
        document.querySelector("#cleanFilters").addEventListener("click", cleanFilters);
        function cleanFilters() {
                newCanvas();
                ctx.drawImage(originalImage, 0, 0, imageScaledWidth, imageScaledHeight);
        }
        /*----------------------------------------------- Punto 3 -----------------------------------------------*/

        //Aplica el filtro binario al canva
        document.querySelector("#binary").addEventListener("click", applyBinaryFilter);
        function applyBinaryFilter() {
                let imageData = ctx.getImageData(0, 0, c.width, c.height);
                for (let y = 0; y < imageData.height; y++) {
                        for (let x = 0; x < imageData.width; x++) {
                                let r = getRed(imageData, x, y);
                                let g = getGreen(imageData, x, y);
                                let b = getBlue(imageData, x, y);
                                if (((r + g + b) / 3) <= 255/2){
                                        r = 0;
                                        g = 0;
                                        b = 0;
                                }else {
                                        r = 255;
                                        g = 255;
                                        b = 255;
                                }
                                setPixel(imageData, x, y, r, g, b, 255);
                        }
                }
                ctx.putImageData(imageData, 0, 0);
        }

        //Aplica el filtro de grises al canva
        document.querySelector("#gray").addEventListener("click", applyGrayFilter);
        function applyGrayFilter() {
                let imageData = ctx.getImageData(0, 0, c.width, c.height);
                for (let y = 0; y < imageData.height; y++) {
                        for (let x = 0; x < imageData.width; x++) {
                                let gray = ((getRed(imageData, x, y) + getGreen(imageData, x, y) 
                                                + getBlue(imageData, x, y)) / 3);
                                setPixel(imageData, x, y, gray, gray, gray, 255);
                        }
                }
                ctx.putImageData(imageData, 0, 0);
        }

        //Aplica el filtro negativo
        document.querySelector("#negative").addEventListener("click", applyNegativeFilter);
        function applyNegativeFilter() {
                let imageData = ctx.getImageData(0, 0, c.width, c.height);
                for (let x = 0; x < imageData.width; x++) {
                        for (let y = 0; y < imageData.height; y++) {
                                let r = 255 - getRed(imageData, x, y);
                                let g = 255 - getGreen(imageData, x, y);
                                let b = 255 - getBlue(imageData, x, y);
                                setPixel(imageData, x, y, r, g, b, 255);
                        }
                }
                ctx.putImageData(imageData, 0, 0);
        }

        //Aplica el filtro sepia
        document.querySelector("#sepia").addEventListener("click", applySepiaFilter);
        function applySepiaFilter() {
                let imageData = ctx.getImageData(0, 0, c.width, c.height);
                for (let x = 0; x < imageData.width; x++) {
                        for (let y = 0; y < imageData.height; y++) {
                                let r = Math.min(0.393 * getRed(imageData, x, y) + 0.769 * getGreen(imageData, x, y) + 0.189 * getBlue(imageData, x, y));
                                let g = Math.min(0.349 * getRed(imageData, x, y) + 0.686 * getGreen(imageData, x, y) + 0.168 * getBlue(imageData, x, y));
                                let b = Math.min(0.272 * getRed(imageData, x, y) + 0.534 * getGreen(imageData, x, y) + 0.131 * getBlue(imageData, x, y));
                                setPixel(imageData, x, y, r, g, b, 255);
                        }
                }
                ctx.putImageData(imageData, 0, 0);
        }

        //Aplica el filtro de brillo
        document.querySelector("#brightness").addEventListener("click", applyBrightnessFilter);
        function applyBrightnessFilter() {
                let imageData = ctx.getImageData(0, 0, c.width, c.height);
                for (let x = 0; x < imageData.width; x++) {
                        for (let y = 0; y < imageData.height; y++) {
                                let hsl = rgbToHsl(imageData, x, y);
                                hsl[2] = hsl[2] + 0.1;
                                let rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
                                setPixel(imageData, x, y, rgb[0], rgb[1], rgb[2], 255);
                        }
                }
                ctx.putImageData(imageData, 0, 0);
        }

        /*----------------------------------------------- Punto 4 -----------------------------------------------*/

        //Aplica el filtro de saturacion
        document.querySelector("#saturation").addEventListener("click", applySaturationFilter);
        function applySaturationFilter() {
                let imageData = ctx.getImageData(0, 0, c.width, c.height);
                for (let x = 0; x < imageData.width; x++) {
                        for (let y = 0; y < imageData.height; y++) {
                                let hsl = rgbToHsl(imageData, x, y);
                                hsl[1] = hsl[1] + 0.1;
                                let rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
                                setPixel(imageData, x, y, rgb[0], rgb[1], rgb[2], 255);
                        }
                }
                ctx.putImageData(imageData, 0, 0);
        }

        //Aplica el filtro blur
        document.querySelector("#blur").addEventListener("click", applyBlurFilter);
        function applyBlurFilter(){
                let imageData = ctx.getImageData(0, 0, c.width, c.height);
                let rAvg = 0;
                let gAvg = 0;
                let bAvg = 0;
                for (let x = 1; x < imageData.width - 1; x++) {
                        for (let y = 1; y < imageData.height - 1; y++) {
                                setAverageRGB(imageData, x, y, rAvg, gAvg, bAvg);
                                
                        }
                }
                ctx.putImageData(imageData, 0, 0);
        }

        //Calcula la data promedio de la matriz que rodea al pixel y le setea el rgb segun ese promedio
        function setAverageRGB(imageData, x, y, rAvg, gAvg, bAvg) {
                rAvg = getRed(imageData, x - 1, y - 1) + getRed(imageData, x, y - 1) + getRed(imageData, x + 1, y - 1)
                        + getRed(imageData, x - 1, y) + getRed(imageData, x, y) + getRed(imageData, x + 1, y)
                        + getRed(imageData, x - 1, y + 1) + getRed(imageData, x, y + 1) + getRed(imageData, x + 1, y + 1);
                gAvg = getGreen(imageData, x - 1, y - 1) + getGreen(imageData, x, y - 1) + getGreen(imageData, x + 1, y - 1)
                        + getGreen(imageData, x - 1, y) + getGreen(imageData, x, y) + getGreen(imageData, x + 1, y)
                        + getGreen(imageData, x - 1, y + 1) + getGreen(imageData, x, y + 1) + getGreen(imageData, x + 1, y + 1);
                bAvg = getBlue(imageData, x - 1, y - 1) + getBlue(imageData, x, y - 1) + getBlue(imageData, x + 1, y - 1)
                        + getBlue(imageData, x - 1, y) + getBlue(imageData, x, y) + getBlue(imageData, x + 1, y + 1)
                        + getBlue(imageData, x - 1, y + 1) + getBlue(imageData, x, y + 1) + getBlue(imageData, x + 1, y + 1);
                setPixel(imageData, x, y, (rAvg/9), (gAvg/9), (bAvg/9), 255);
        }

        /*----------------------------------------------- Punto 5 -----------------------------------------------*/

        //Descarga la canva y no la imagen antigua modificada, checkear
        document.querySelector("#buttonDownload").addEventListener("click", download);
        function download() {
                let download = document.getElementById("download");
                let newImage = document.getElementById("canvas").toDataURL("newImage/png")
                    .replace("newImage/png", "newImage/octet-stream");
                download.setAttribute("href", newImage);
        }

        //Vuelve a pintar la canva de blanco (la limpia)
        document.querySelector("#new").addEventListener("click", newCanvas);
        function newCanvas(){
                ctx.beginPath();
                ctx.rect(0, 0, c.width, c.height);
                ctx.fillStyle = "rgba(255,255,255,1)";
                ctx.fill();
        }
})

        /*------------------------------------------ ------------------ ------------------------------------------*/
        /*------------------------------------------ Metodos Auxiliares ------------------------------------------*/

//Setea el color rgba del pixel seleccionado
function setPixel(imageData, x, y, r, g, b, a){
        let index = (x + y * imageData.width) * 4;
        imageData.data[index+0] = r;
        imageData.data[index+1] = g;
        imageData.data[index+2] = b;
        imageData.data[index+3] = a;
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

//transforma los valores rgb a hsl
function rgbToHsl(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        let r = imageData.data[index+0];
        let g = imageData.data[index+1];
        let b = imageData.data[index+2];
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;
        if (max == min) {
                h = s = 0; // achromatic
        } else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
        }
        return [ h, s, l ];
}

//transforma los valores hsl a rgb
function hslToRgb(h, s, l) {
        var r, g, b;
        if (s == 0) {
                r = g = b = l; // achromatic
        } else {
                function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
                }
                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                r = hue2rgb(p, q, h + 1/3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1/3);
        }
        return [ r * 255, g * 255, b * 255 ];
}

/*
TO DO LIST

que cuando descargas la canva se descargue con la resolucion anterior

*/ 