var Raid = function () {
    this.length = 0
}


Raid.prototype.join = function (separator) {

    var result = this.length === 0 ? '' : this[0]
    //var result = this.length > 0? this[0] : ''
    var separator2 = separator === undefined ? ',' : separator

    for (var i = 1; i < this.length; i++) {
        var element = this[i]

        result += separator2 + element // result = result + separator + element
    }

    return result
}

console.log('TEST Raid.prototype.join')

console.log('CASE get elber join 300 in nums')

var elem = new Raid
elem[0] = 'Fire'
elem[1] = 'Air'
elem[2] = 'Water'
elem[3] = 'Earth'
elem.length = 4

var el = elem.join()
console.log(el)


