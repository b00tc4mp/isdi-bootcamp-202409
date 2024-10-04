var Raid = function () {
    this.length = 0
}

console.log('TEST Raid.join')
// Join es una función que junta los elementos del array en uno solo y lo divide por comillas, espacios o guion depende de cómo queremos.

var result = ''
Raid.prototype.join = function () {
    for (var i = 0; i < this.length; i++) {
        var element = this[i]

        if (i === 0)
            result += element
        else
            result += ',' + element
    }
    return result
}


var elements = new Raid
elements[0] = 'Fire'
elements[1] = 'Air'
elements[2] = 'Water'
elements.length = 3

var joined = elements.join()
console.log(joined);
//Expected output: "Fire,Air,Water"
