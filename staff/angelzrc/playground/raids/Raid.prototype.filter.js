var Raid = function () {
    this.length = arguments.length
    for (var i = 0; i < arguments.length; i++) {
        this[i] = arguments[i]
    }
}

console.log('TEST Array.prototype.filter')

Raid.prototype.filter = function (callback) {

    var result = new Raid
    for (var i = 0; i < this.length; i++) {
        if (callback(this[i]) === true) {
            result[result.length] = this[i]
            result.length++
        }
    }

    return result
}

var words = new Raid('spray', 'elite', 'exuberant', 'destruction', 'present');

var result = words.filter((word) => word.length > 6);

console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"]
