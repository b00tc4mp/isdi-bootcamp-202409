var Raid = function () {
    this.length = 0
}

Raid.prototype.indexOf = function (element, index) {
    if (!index) {
        index = 0
    }
    else if (index < 0) {
        index = this.length + index
    }
    for (var i = index; i < this.length; i++) {
        if (this[i] === element) {
            return i
        }
    }
    return -1
}
var beasts = new Raid
beasts[0] = "ant"
beasts[1] = "bison"
beasts[2] = "camel"
beasts[3] = "duck"
beasts[4] = "lion"
beasts.length = 5

beast = beasts.indexOf("camel")
console.log(beast) 