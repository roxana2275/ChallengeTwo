var palabras = ["programacion","javascript","canvas","alura", "oracle"]
var palabraAdivinar = []
var palabraMostrar = []
var juegoIniciado = false
var botonIniciar = document.querySelector("#iniciar-juego");
var botonAgregar = document.querySelector("#nueva-palabra");

botonIniciar.addEventListener("click",function(){    
    muniecoAhorcado = ["cabeza","cuerpo","brazoDerecho","brazoIzquierdo","piernaDerecha","piernaIzquierda"]
    //transforma palabra en mayuscula y selecciona random
    palabraAdivinar = Array.from((palabras[Math.floor(Math.random() * (palabras.length))]).toUpperCase());
    //muestra palabra con _ por cada cantidad de letra
    palabraMostrar = Array.from("_".repeat(palabraAdivinar.length));
    letrasEquivocadas = [];
    letraPulsada = [];
    //en canvas inicia el soporte del cuerpo
    iniciarTablero();
    //muestra las letras de la palabra random separada por espacios
    escribirPalabraSecreta( palabraMostrar.join(" "));
    //muestra las letras equivocadas separada por espacios
    escribirLetra(letrasEquivocadas.join(" "));
    //pasa la variable de false a true
    juegoIniciado = true;
    //deshabilita el botón de insertar palabras
    habilitarDeshabilitarInput(true)
    console.log(palabras)
});

//boton agregar palabra

botonAgregar.addEventListener("click",function(){
    inputPalabra = document.querySelector('#input-nueva-palabra');
    //devuelve un array con los valores correspondientes a la palabra elegida
    var palabra = inputPalabra.value;
    var pattern = /^[a-z\s]+$/g;
    /*^[a-z]+$/i
^ indica que el patrón debe iniciar con los caracteres dentro de los corchetes
[a-z] indica que los caracteres admitidos son letras del alfabeto
+ indica que los caracteres dentro de los corchetes se pueden repetir
$ indica que el patrón finaliza con los caracteres que están dentro de los corchetes.*/

    if (pattern.test(palabra)){//compara que los campos de palabra esten dentro de pattern
        palabras.push(palabra);//si pasa el patter lo inserta en la variable palabras
        inputPalabra.value = "";
    }


})
//desabilita insertar palabras cuando estoy jugando
function habilitarDeshabilitarInput(habilitarDeshabilitar){
    var inputPalabra = document.querySelector('#input-nueva-palabra');
    inputPalabra.disabled = habilitarDeshabilitar
}


function controlaLetra(letra){
    var pattern = /^[A-Z\s]+$/g;
    letra = letra.toUpperCase()     

    if (!letraPulsada.includes(letra) && pattern.test(letra) ){
        letraPulsada.push(letra)
        var advino = false;
        for(indice = 0 ; indice<palabraAdivinar.length; indice++){        
                if (palabraAdivinar[indice] == letra){            
                    palabraMostrar[indice] = letra;
                    advino = true;
                }
        }

        if (!advino){
            letrasEquivocadas.push(letra)
            var parteMunieco = muniecoAhorcado.shift();
            var fn = window[parteMunieco];
            if (typeof fn === "function") fn.apply(null, null); 
            escribirLetra(letrasEquivocadas.join(" "))                           
        }else{
            escribirPalabraSecreta(palabraMostrar.join(" "))
        }

        if (muniecoAhorcado.length == 0){
             juegoIniciado = false
             habilitarDeshabilitarInput(false)
             mensajeFinal("Fin del Juego!!","brown")             
        }else{
            if (!palabraMostrar.includes("_")){
              juegoIniciado = false
              habilitarDeshabilitarInput(false)
              mensajeFinal("Ganaste!!","brown")
            }
        }
    }else{
        if (!pattern.test(letra)){
            alert("Presione solo letras")
        }else{
            alert("Letra ya elegida")
        }
    }

}


window.onload = function() {
    document.onkeypress = muestraInformacion;
}

function muestraInformacion(elEvento) {
    var evento = window.event || elEvento;

    if (juegoIniciado){
        controlaLetra(String.fromCharCode(evento.charCode))
    }
 }