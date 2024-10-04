var forEach = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]

        callback(element)

    }

}

console.log('Test Array.prototype.forEach')

console.log('CASE executes a provided function once for each array element')


var nombres = { 0: 'Victoria', 1: 'Anna', 2: 'Alba', 3: 'Monica', length: 4 }
// 'Victoria'
//'Anna'
//'Alba'
//'Monica'

var elem = function (element) {
    console.log(element)
}

forEach(nombres, elem)