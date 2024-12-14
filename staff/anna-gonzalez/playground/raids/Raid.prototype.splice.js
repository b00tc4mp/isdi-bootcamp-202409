var Raid = function () {
    this.length = 0
}

Raid.prototype.splice = function (start, deleteCount, element) {
    var result = []
    if (deleteCount === 0) {
        for (var i = this.length; i > start; i--) {
            result[i] = this[i - 1]
        }

        for (var i = 0; i < start; i++) {
            result[i] = this[i]
            result[start] = element
        }

        return result
    } else {
        for (var j = this.length + 1; j > -1; j--) {
            result[j + 1] = this[j]
        }

        return result
    }
}

console.log('TEST Raid.prototype.splice')

console.log('CASE insert at index 1')

var months = new Raid
months[0] = 'Jan'
months[1] = 'March'
months[2] = 'April'
months[3] = 'June'
months.length = 4

var addMonth = months.splice(1, 0, 'Feb')
console.log(addMonth)
// ['Jan', 'Feb', 'March', 'April', 'June']