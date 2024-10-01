var Raid = function () {
    this.length = 0
}

Raid.prototype.push = function (){
    for(var i = 0; i < arguments.length; i++){
        var element = arguments[i]

        this[this.length] = element
        this.length++
    }
    return this.length
}

var raidNumbers = new Raid
raidNumbers[0] = 'cinco';
raidNumbers[1] = 'diez';
raidNumbers[2] = 'quince';
raidNumbers[3] = 'veinte';
raidNumbers.length = 4
var length = raidNumbers.push('teinta', 'cuarenta')

console.log(raidNumbers)

