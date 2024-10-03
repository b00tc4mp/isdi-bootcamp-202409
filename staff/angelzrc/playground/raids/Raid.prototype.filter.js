var Raid = function () {
    this.length = arguments.length
    for (var i = 0; i < arguments.length; i++) {
        this[i] = arguments[i]
    }
}

console.log('TEST Array.prototype.filter')

Raid.prototype.filter = function (callback) {
    for (var i = 0; i < this.length; i++) {
        if (callback(this[i]) === true) {
            var startIndex = i
            break
        }

    }
    var result = new Raid
    for (var j = startIndex; j < this.length; j++) {
        result[j - startIndex] = this[j]
        result.length++
    }
    return result
}

var words = new Raid('spray', 'elite', 'exuberant', 'destruction', 'present');

var result = words.filter((word) => word.length > 6);

console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"]
