var Raid = function () {
    this.length = 0
}

Raid.prototype.indexOf = function (element, fromIndex) {
    if (!fromIndex) {
        fromIndex = 0
    } else if (fromIndex < 0) {
        fromIndex = this.length + fromIndex
    }
    for (var i = fromIndex; i < this.length; i++) {
        if (this[i] === element) {
            return i
        }
    }
    return -1
}

console.log('TEST Array.prototype.indexOf')

console.log('Buscar con una properidad que indice tiene')

var beasts = new Raid
beasts[0] = "ant"
beasts[1] = "bison"
beasts[2] = "camel"
beasts[3] = "duck"
beasts[4] = "bison"
beasts.length = 5

var beast = beasts.indexOf("duck", 0)

console.log(beast)
// 3

console.log(beasts.indexOf("camel", -4))
//2



