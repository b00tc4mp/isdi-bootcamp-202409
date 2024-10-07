


var Raid = function () {
    this.lenght = 0
    for (var i = 0; i < arguments.length; i++) {
        this[i] = arguments.length
    }
}

Raid.prototype.at = function (index) {

    if (index >= 0) {
        return this[index]
    }

    else {
        return this[this.length + index]
    }
}

var countries = new Raid
countries[0] = 'french';
countries[1] = 'germany';
countries[2] = 'italy';
countries[3] = 'spain';
countries.length = 4;

console.log(countries.at(2))