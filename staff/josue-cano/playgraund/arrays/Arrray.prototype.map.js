var numeros = [1,2,3,4,5];
var personas = [{nombre: 'carla', edad: 15},{nombre: 'Luis', edad: 18}];
//Esta es la funcion callback
var cuadrado = function (numero){
    return numero*numero;
};

// console.log("valores originales :  ", numeros);
// console.log("valores cuadrados :  ", numeros.map(cuadrado));

// var prueba = numeros.map(cuadrado);
// console.log(prueba)

var esMayor = function(persona){
    if (persona.edad >= 18){
        return {nombre: persona.nombre, esMayor:true}
    }
    else{
        return {nombre: persona.nombre, esMayor:false}
    }
}
console.log(personas.map(esMayor))