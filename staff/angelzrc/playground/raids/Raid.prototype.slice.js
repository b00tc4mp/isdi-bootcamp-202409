var Raid = function () {
    this.length = arguments.length
    for (var i = 0; i < arguments.length; i++) {
        this[i] = arguments[i]
    }
}

console.log('TEST Array.prototype.slice')

Raid.prototype.slice = function (start, end) {
    end === undefined ? end = this.length : end < 0 ? end = this.length + end : end = end
    start === undefined ? start = 0 : start < 0 ? start = this.length + start : start = start
    var result = new Raid
    for (var i = start; i < end; i++) {
        result[i - start] = this[i]
        result.length++
    }
    return result
}
var animals = new Raid('ant', 'bison', 'camel', 'duck', 'elephant');

console.log(animals.slice(2));
// Expected output: Raid {0: 'camel', 1: 'duck', 2: 'elephant', length: 3}

console.log(animals.slice(2, 4));
// Expected output: Raid {0: 'camel', 1: 'duck', length: 2}

console.log(animals.slice(1, 5));
// Expected output: Raid {0: 'bison', 1: 'camel', 2: 'duck', 3: 'elephant', length: 4}

console.log(animals.slice(-2));
// Expected output: Raid {0: 'duck', 1: 'elephant', length: 2}

console.log(animals.slice(2, -1));
// Expected output: Raid {0: 'camel', 1: 'duck', length: 2}

console.log(animals.slice());
// Expected output: Raid {0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'elephant', length: 5}