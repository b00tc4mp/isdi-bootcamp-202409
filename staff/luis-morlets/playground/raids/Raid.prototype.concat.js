console.log('TEST Raid.prototype.concat')


var Raid = function () {
    this.length = 0
}

Raid.prototype.concat = function () {

    var result = { length: 0 }
    for (var k = 0; k < this.length; k++) {
        result[result.length++] = this[k]
    }

    for (var i = 0; i < arguments.length; i++) {
        for (var j = 0; j < arguments[i].length; j++) {
            var element = arguments[i][j]
            result[result.length] = element;
            result.length++
        }
    }
    return result
}

console.log('CASE concat 2 raids of characters')

var abc = new Raid
abc[0] = 'a'
abc[1] = 'b'
abc[2] = 'c'
abc.length = 3

var def = new Raid
def[0] = 'd'
def[1] = 'e'
def[2] = 'f'
def.length = 3

var abcdef = abc.concat(def)
console.log(abcdef)
//'a', 'b', 'c', 'd', 'e', 'f'

console.log('CASE concat 3 raids of characters')

var abc = new Raid
abc[0] = 'a'
abc[1] = 'b'
abc[2] = 'c'
abc.length = 3

var def = new Raid
def[0] = 'd'
def[1] = 'e'
def[2] = 'f'
def.length = 3

var ghi = new Raid
ghi[0] = 'g'
ghi[1] = 'h'
ghi[2] = 'i'
ghi.length = 3

var abcdefghi = abc.concat(def, ghi)
console.log(abcdefghi)
//// { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', 6: 'g', 7: 'h', 8: 'i', length: 9 }