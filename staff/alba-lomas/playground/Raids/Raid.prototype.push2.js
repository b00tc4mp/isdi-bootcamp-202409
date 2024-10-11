


var Raid = function () {
    this.length = 0
}

Raid.prototype.push = function (element) {
    // this -> {0: 100, 1: 200, 2: 300, length: 3 }
    // element -> 400

    // meter el 400 al final
    this[this.length] = element
    this.length++
}

var raidNumeros = new Raid
raidNumeros[0] = 100;
raidNumeros[1] = 200;
raidNumeros[2] = 300;
raidNumeros.length = 3;

var length = raidNumeros.push('400')

console.log(raidNumeros)