console.log('TEST join')
// Join es una función que junta los elementos del array en uno solo y lo divide por comillas, espacios o guion depende de cómo queremos.

var result = ''

var join = function (iterable) {
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]

        if (i === 0)
            result += element
        else
            result += ',' + element
    }
    return result
}


var elements = { 0: 'Fire', 1: 'Air', 2: 'Water', length: 3 };
var joined = join(elements)
console.log(joined);
//Expected output: "Fire,Air,Water"

