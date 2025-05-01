var Raid = function () {
    this.length = 0
}
Raid.prototype.join = function (separator) {
    var result = this.length === 0 ? '' : this[0]
    var separator2 = separator === undefined ? ',' : separator
    for (var i = 1; i < this.length; i++) {
        var element = this[i]
        result += separator2 + element
    }
    return result
}

console.log('TEST join')

console.log('CASE join elements')

var elements = new Raid
elements[0] = "Fire"
elements[1] = "Air"
elements[2] = "Water"
elements[3] = "Earth"
elements.length = 4

var joined = elements.join()

console.log(joined)
// 'Fire,Air,Water,Earth'

console.log('CASE join elements with #')

var joined = elements.join("#")
console.log(joined)
// 'Fire#Air#Water#Earth'