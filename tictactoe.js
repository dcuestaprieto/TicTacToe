/**
 * Todas las casillas tienen la clase .casilla
 * 
 */

/**
 * Almacenamos todas las casillas, es decir, todos los divs que tienen clase 'casilla'
 * En total tenemos 9 casillas que van desde la 0 hasta la 8
 */
let casillas = document.getElementsByClassName("casilla");

/**
 * Creamos un array con arrays que contienen todas las combinaciones ganadoras
 * 
 * [0] => [0, 1, 2]
 * [1] => [3, 4, 5]
 * ...
 */
let combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

/**
 * Recorrer las casillas que tengo en array casillas
 * Comprobar el contenido de cada una
 */

/**
 * Utilizo el array posicionesLlenas para introducir aquellas posiciones que contienen
 * un texto igual a 'X'
 * 
 * Al realizar un push lo que hago es introducir en el array, el numero de la posicion
 */
// let posicionesLlenas = [];
// for(let i = 0; i < casillas.length; i++){
//     console.log('La casilla numero ' + i + ' contiene: ' + casillas[i].innerHTML);
//     if(casillas[i].innerHTML == 'X'){
//         posicionesLlenas.push(i);
//     }
// }
// console.log(posicionesLlenas);

/**
 * Una vez tengo un array con las posiciones que contienen una 'X',
 * me interesa poder comparar si en el contenido de 'posicionesLlenas' esta incluido
 * alguna de las combinaciones de 'combinacionesGanadoras'.
 * 
 * En este caso en 'posicionesLlenas' tenemos:
 * [0] ---> 0
 * [1] ---> 1
 * [2] ---> 2
 * [3] ---> 5
 * 
 * En este caso en 'combinacionesGanadoras' tenemos:
 * [0] ---> [0, 1, 2]           // CORRECTA
 */


/**
 * -------------------------------------------------------------------------
 * CONTENIDO NUEVO
 * -------------------------------------------------------------------------
 */
let tocaJugar=true;
let combinacionesJuegoO=[];
let combinacionesJuegoX=[];
let contadorX, contadorO;
let contadorVictoriaX=0, contadorVictoriaO=0;
let button, pVictoriasX, pVictoriasO;
let parrafoVictorias;

parrafoVictorias=document.getElementById('p-resultados');

parrafoVictorias.textContent=`O: ${contadorVictoriaO} e X: ${contadorVictoriaX}`;

button=document.createElement('button');
button.setAttribute('onclick','resetear()');
button.textContent='Resetear';

document.getElementsByClassName('tablero')[0].appendChild(button);

function agregarFicha(numero){
    //Esta funcion se usa para pintar X u O según se va cambiando el turno
    let casillaFun=document.getElementsByClassName("casilla")[numero];
    //Se llama al método en funcion de a quién le toca jugar y ahí cambian los parámetros
    if(tocaJugar){
        casillaFun.textContent="O";
        agregarPosicion(combinacionesJuegoO,numero, contadorO);
    }else{
        casillaFun.textContent="X";
        agregarPosicion(combinacionesJuegoX,numero,contadorX);
    }
    cambiarValor();
    /**
     * Cuando se activa esta funcion por el evento del click
     * es necesario eliminar el click del div
     */
    casillas[numero].removeAttribute('onclick');
}

function cambiarValor(){
    //Cambiar el valor después de que se haya jugado
    if(tocaJugar){
        tocaJugar=false;
    }else{
        tocaJugar=true;
    }
}

function agregarPosicion(arr, numero, combinaciones){
    // console.log(numero);
    //Al array (dependiendo de si es x u o) se añade el número que ha desembocado la llamada onclick
    arr.push(numero);
    // console.log(arr);
    for(combinacion in combinacionesGanadoras){
        // console.log(combinacionesGanadoras[combinacion]);
        for(i in arr){
            // console.log(arr[i]);
            //Hay que recorrer el array de combinaciones ganadoras y el array de X u O
            if(combinacionesGanadoras[combinacion].includes(arr[i])){
                //Si coincide alguno de los valores del array de X u O pues se suma un contador que debe ir hasta 3 y eso es que coincidan todos
                // console.log(arr[i]+" es una combinacion ganadora");
                combinaciones++;
            }
        }
        if(combinaciones==3){
            //Si es igual a 3 es que hay una combinacion ganadora por lo que hay que saltar victoria
            if(tocaJugar){
                console.log("Victoria O");//Mostrar de quien es la victoria
                contadorVictoriaO++;//Sumar uno a la victoria de X u O
                parrafoVictorias.textContent=`O: ${contadorVictoriaO} e X: ${contadorVictoriaX}`;//Actualizar la tabla de resultados
                quitarOnclick();//Quitar los eventos click de las demás casillas

            }else{
                //En el else es lo mismo que el anterior pero con las X
                console.log("Victoria X");
                contadorVictoriaX++;
                parrafoVictorias.textContent=`O: ${contadorVictoriaO} e X: ${contadorVictoriaX}`;
                quitarOnclick();
            }
        }
        combinaciones=0;
    }
}

function quitarOnclick(){
    //Esta funcion quita los onclick de todas las casillas recorriendolas todas
    for (let i = 0; i < casillas.length; i++) {
        casillas[i].removeAttribute('onclick');
    }
}

function resetear(){
    for (let i = 0; i < casillas.length; i++) {
        casillas[i].textContent='';//Pone a vacio el textContent
        casillas[i].setAttribute('onclick',`agregarFicha(${i})`);//Agrega el onclick para el método agregarFicha
    }
    //Resetea todos los arrays de X y O
    combinacionesJuegoO=[];
    combinacionesJuegoX=[];
    //Refresco el contador
    console.log("O: ",contadorVictoriaO," e X:",contadorVictoriaX);
}

/**
 * Para acabar el juego necesitamos:
 * 1. Colocar ficha
 * 2. Comprobar en cada insercion de ficha si se ha ganado el juego
 * 3. Cambiar turno
 * 4. Cuando hay ganador, mostrar mensaje
 * 
 * OPCIONES EXTRA:
 * 1. Generar un contado de victorias y resetear el tablero
 */