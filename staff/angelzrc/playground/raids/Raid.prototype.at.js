var Raid = function () {
    this.length = arguments.length
    for (var i = 0; i< arguments.length; i++) {
        this[i] = arguments[i]
    }
}

console.log('TEST Raid.prototype.at')

Raid.prototype.at = function (index) {
    index < 0 ? index = this.length + index : index = index
    return this[index]
}
console.log('CASE locate index 2 on Raid1')

var Raid1 = new Raid(5, 12, 8, 130, 44);

console.log(Raid1.at(2));
// Expected output: 8

console.log('CASE locate index -2 on Raid1')
console.log(Raid1.at(-2));
// Expected output: 130