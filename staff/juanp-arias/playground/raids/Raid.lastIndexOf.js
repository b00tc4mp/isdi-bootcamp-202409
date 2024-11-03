console.log('TEST Raid.lastIndexOf')

var Raid = function () {
    this.length = 0
}
Raid.prototype.lastIndexOf = function (searchElement, fromIndex) {
    if (fromIndex === undefined) {
        fromIndex = this.length - 1;
        
    } else if (fromIndex < 0)
        fromIndex = fromIndex + this.length;

    for (var i = fromIndex; i >= 0; i--) {
        if (this[i] === searchElement) {
            return i;
        }
    }

    return -1;
}

console.log('CASE searching names')


var alumnos = new Raid
alumnos[0] = "Lucía González"
alumnos[1] = "Santiago Pérez"
alumnos[2] = "Ana Martínez"
alumnos[3] = "Carlos Ruiz"
alumnos[4] = "Lucía González"
alumnos[5] = "Javier Sánchez"
alumnos[6] = "Laura García"
alumnos.length = 7

console.log(' search for "Carlos Ruiz" in Raid');
console.log(alumnos.lastIndexOf('Carlos Ruiz'));
// Expected output: 3


