var pokemones = { 0: "Charmander", 1: "Bulbasaur", 2: "Squirtle", 3: "Pikachu", length: 4 }

var myPop = function (iteracion) {
    var last = iteracion[iteracion.length - 1];
    delete iteracion[iteracion.length - 1];
    iteracion.length--;
    return last
}

myPop(pokemones)

console.log(pokemones)
console.log(last)