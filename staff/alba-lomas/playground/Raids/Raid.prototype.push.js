


var numero = function (hasta50, hasta99) {
    this.hasta50 = hasta50
    this.hasta99 = hasta99
}

var cien = new numero('103', '189')
var doscientos = new numero('235', '262')
var trescientos = new numero('350', '377')
var cuatrocientos = new numero('429', '493')

var numeros = [cien, doscientos, trescientos]

console.log(numeros)

var raidNumeros = { length: 3 };
raidNumeros[0] = cien;
raidNumeros[1] = doscientos;
raidNumeros[2] = trescientos;
raidNumeros.length = 3;

console.log(raidNumeros)

var push = function (iterable, element) {
    iterable[iterable.length] = element
    iterable.length++
}

var length = push(raidNumeros, cuatrocientos)

console.log(raidNumeros)




