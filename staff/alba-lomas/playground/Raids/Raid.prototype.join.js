


var Raid = function () {
    this.length = 0
}

Raid.prototype.join = function () {

    var result = ''

    for (var i = 0; i < this.length; i++) {
        var element = this[i]

        if (i === 0)
            result = element
        else
            result += ',' + element
    }

    return result
}

var elements = new Raid
elements[0] = 'fire';
elements[1] = 'air';
elements[2] = 'water';
elements[3] = 'earth'
elements.length = 4;

var joined = elements.join()

console.log(joined)