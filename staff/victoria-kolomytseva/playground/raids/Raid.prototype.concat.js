console.log('TEST Raid.prototype.concat')

console.log('CASE concat 2 raids of characters')

var Raid = function () {
    this.length = 0
}

Raid.prototype.concat = function () {

    for (var i = 0; i < arguments.length; i++) {
        for (var j = 0; j < arguments[i].length; j++) {
            element = arguments[i][j]
            this[this.length] = element;
            this.length++
        }
    }

    return this
}




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