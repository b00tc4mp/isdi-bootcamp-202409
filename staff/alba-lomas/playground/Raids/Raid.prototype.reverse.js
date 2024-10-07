


var Raid = function () {
    this.length = 0
}

Raid.prototype.reverse = function (this) {

    for (var i = this.length; i >= 0; i--) {

        result[result.length] = this[i - 1];

        result.length += 1;
    }

    animales = result;
    return animales;
}


var animales = { length: 0 };
animales[0] = 'gato';
animales[1] = 'perro';
animales[2] = 'gallina';
animales[3] = 'caballo';
animales.length = 4;

var reversed = animales.reverse
console.log(reverse(animales))