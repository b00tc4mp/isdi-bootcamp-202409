var Raid = function () {
    this.length = 0
}
Raid.prototype.concat = function () {
    //Primero declaramos variable resultante
    //Recorremos el primer objeto y lo copiamos a la variable declarada y actualizamos length
    //Recorremos el segundo objeto y lo copiamos a la variable declarada y actualizamos length
    //Return variable resultante

    var result = new Raid
    for (var k = 0; k < this.length; k++) {
        result[result.length] = this[k]
        result.length++
    }

    for (var i = 0; i < arguments.length; i++) {
        for (var j = 0; j < arguments[i].length; j++) {
            result[result.length] = arguments[i][j]
            result.length++
        }
    }

    return result
}


var colors1 = new Raid
colors1[0] = 'green'
colors1[1] = 'red'
colors1[2] = 'pink'
colors1[3] = 'blue'
colors1.length = 4

var colors2 = new Raid
colors2[0] = 'white'
colors2[1] = 'black'
colors2[2] = 'violet'
colors2[3] = 'blue'
colors2.length = 4

var colors = colors1.concat(colors2)
console.log(colors)