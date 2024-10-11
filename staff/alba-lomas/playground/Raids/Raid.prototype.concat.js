


var Raid = function () {
    this.length = 0
}
Raid.prototype.concat = function () {
    // declaramos variable resultante
    // recorremos el primer objeto y lo copiamos a la variable declarada y actualizamos length.
    // recorremos el segundo objeto y lo copiamos a la variable declarada y actualizamos length.
    // retornamos la variable resultante
    var result = { length: 0 }

    for (var k = 0; k < this.length; k++) {
        result[result.length++] = this[k]
    }

    for (var i = 0; i < arguments.length; i++) {
        for (var j = 0; j < arguments[i].length; j++) {
            result[result]
            result[result.length] = arguments[i][j]
            result.length++
        }
    }

    return result

}

var abc = new Raid
abc[0] = 'a'
abc[1] = 'b'
abc[2] = 'c'
abc.length = 3

var def = new Raid
def[0] = 'd'
def[1] = 'e'
def[2] = 'f'
def.length = 3

var abcdef = abc.concat(def)
console.log(abcdef)