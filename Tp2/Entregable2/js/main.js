"use strict";

document.addEventListener("DOMContentLoaded", function () {

    //inicia canvas, contexto y el mensajero
    let canvas = document.querySelector("#MyCanvas");
    let ctx = canvas.getContext("2d");
    let messager = document.querySelector("#message");


    // let isMouseDown = false;


    //inicia pantalla inicial
    newCanvas();


    function newCanvas() {
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(0,0,0,0.8)";
        ctx.fill();
    }

    //boton inicio de juego
    document.querySelector("#newGame").addEventListener("click", function () {


        //variables de selectores
        let width = widthSelector.value;
        let height = heightSelector.value;
        let rows = rowsSelector.value;
        let columns = columnsSelector.value;
        let limits = limitations(width, height, rows, columns);//auxiliar de limites


        if ((width != "" && height != "" && rows != "" && columns != "") &&
            limits) { //controla que las opciones sean correctas para iniciar

            let cantRows = parseInt(rows) + 1;  //variable añade una fila extra en blanco

            let board = new Board(width, height,  //INSTANCIA UN NUEVO TABLERO
                cantRows, columns, ctx);

            canvasAdaptionToBoard(board)         //canvas se adapta al tablero     

            board.initializeBoard();           //SE INICIALIZA EL TABLERO

            messager.innerHTML = "Pasala lindo pibi";
        } else {
            messager.innerHTML = "No estas ingresando los tamaños permitidos";
            newCanvas();
        }


        function limitations(width, height, rows, columns) {  //controla limites
            const minWidth = 400;
            const maxWidth = 800;
            const minHeight = 400;
            const maxHeight = 800;
            const minRows = 6;
            const maxRows = 20;
            const minColumns = 6;
            const maxColumns = 20;
            if ((width >= minWidth && width <= maxWidth) &&
                (height >= minHeight && height <= maxHeight) &&
                (rows >= minRows && rows <= maxRows) &&
                (columns >= minColumns && columns <= maxColumns)) {
                return true;
            }
            else {
                return false;
            }
        }

        function canvasAdaptionToBoard(board) {
            let boardWidth = board.getWidthBoard();   //toma dimensiones de tablero
            let boardHeight = board.getHeightBoard();
            canvas.width = boardWidth;
            canvas.height = boardHeight;
        }

    })








    /*
    
        function onmousedown(e) {
            let x = e.layerX;
            let y = e.layerY;
            isMouseDown = true;
            addDrawPoint(x, y);
        }
    
    
        function onmouseup() {
            isMouseDown = false;
        }
    
        function onmousemove(e) {
            let x = e.layerX;
            let y = e.layerY;
            if (isMouseDown) {
                addDrawPoint(x, y);
            }
        }
    
    */







    /*canvas.addEventListener("mousedown", onmousedown, false);
    canvas.addEventListener("mouseup", onmouseup, false);
    canvas.addEventListener("mousemove", onmousemove, false);
*/

    let rowsSelector = document.querySelector("#rowsSelect");
    let columnsSelector = document.querySelector("#columnsSelect");
    let heightSelector = document.querySelector("#heightSelect");
    let widthSelector = document.querySelector("#widthSelect");

})
