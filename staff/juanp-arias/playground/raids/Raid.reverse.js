var Raid = function () {
    this.lenght = 0
}


Raid.prototype.reverse = function () {

    var result = { length: 0 };

    for (var i = this.length; i > -1; i--) {

        result[result.length] = this[i - 1];

        result.length++;
    }

    colors = result;
    return result;
}

var colors = new Raid
colors[0] = 'blue'
colors[1] = 'yellow'
colors[2] = 'green'
colors[3] = 'pink'
colors.length = 4

console.log(colors.reverse())