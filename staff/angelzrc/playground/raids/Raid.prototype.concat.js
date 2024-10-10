var Raid = function () {
    length: 0
}

Raid.prototype.concat = function () {
    //add the properties and values of one object to another.
    // in this case the properties are interger (indexes) and one final length
    // for one 1 argument, add length of iterable properties of argument and add length of argument to length of iterable
    var result = new Raid
    for (var i = 0; i < this.length; i++) {
        result[i] = this[i]
    }
    result.length = this.length
    for (var j = 0; j < arguments.length; j++) {
        for (var i = 0; i < arguments[j].length; i++) {
            result[result.length + i] = arguments[j][i]
        }
        result.length = result.length + arguments[j].length

    }
    return result
}



console.log('CASE merge two raids into one using concat')
var abc = new Raid
abc[0] = 'a'
abc[1] = 'b'
abc[2] = 'c'
abc.length = 3

var defxy = new Raid
defxy[0] = 'd'
defxy[1] = 'e'
defxy[2] = 'f'
defxy[3] = 'x'
defxy[4] = 'y'
defxy.length = 5

var abcdefxy = abc.concat(defxy);

console.log(abcdefxy);
// Expected output:  Raid {0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', 6: 'x', 7: 'y'  length: 8}

console.log('CASE merge 3 raids into one concat')

var ghij = new Raid
ghij[0] = 'g'
ghij[1] = 'h'
ghij[2] = 'i'
ghij[3] = 'h'
ghij.length = 4

var abdcefxyghij = abc.concat(defxy, ghij)
console.log(abdcefxyghij)
// Expected output: Raid {0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', 6: 'x', 7: 'y', 8: 'g', 9: 'h', 10: 'i', 11: 'j', length: 12}