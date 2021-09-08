let matrix = [];
let maxNum = 0;
let maxFilaPar = 0;
let maxFilaImpar = 0;
let promedio =0;
let promedioFila =0;
let arrayPromedios = [];

for(var i=0; i<=9; i++) {
    matrix[i] = [];

    for(var j=0; j<=9; j++) {
        matrix[i][j] = Math.floor(Math.random()*10000);

        encontrarMax();
        maxFilaParEImpar();
        arrayPromedios[i] = promedioPorFila(i);
    }
}

////Escribir una función que retorne el valor máximo de toda la matriz 
function encontrarMax(){
    if (maxNum < matrix[i][j]){
        maxNum = matrix[i][j];
    }
}

//Escribir una función que retorne el valor máximo contenido en las filas 
//pares y el valor mínimo en las filas impares 
function maxFilaParEImpar(){
    if ((j % 2) == 0 && (maxFilaPar < matrix[i][j])){
        maxFilaPar = matrix[i][j];
    }

    if ((j % 2) !== 0 && (maxFilaImpar < matrix[i][j])){
        maxFilaImpar = matrix[i][j];
    }
}

//Calcular el valor promedio de cada fila y guardarlos en un arreglo. 

function promedioPorFila(i){
    promedioFila = 0;
    for (var j=0; j<=9; j++) {
        promedio += matrix[i][j];
    }
    promedioFila = promedio/10;
    promedio = 0;
    return promedioFila;
}

console.log(matrix);
console.log("hecho 10x10 solo para que sea mas comodo verlo en pantalla");
console.log("maximo numero de la matriz: " + maxNum);
console.log("maximo numero filas pares: " + maxFilaPar);
console.log("maximo numero filas impares: " +maxFilaImpar);
for (var i=0; i<=9; i++) {
    console.log("promedio fila " + i + " es igual a: " + arrayPromedios[i]);
}
