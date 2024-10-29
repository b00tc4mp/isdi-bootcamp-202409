// create Raid

//Raid.prototype.concat = {length:0}
    
var Raid = function () {
    this.length = 0;
}

Raid.prototype.concat = function () {

    var result = { length: 0}
    for (var j = 0; j < arguments.length; j++) {
        var iterableX = arguments[j];
        for (var i = 0; i < this.length; i++) {
            var element = iterableX[i];
            result[result.length] = element;
            result.length++;
        }
    }
    return result;
}

var colors1 = new Raid;
colors1[0] = 'green';
colors1[1] = 'red';
colors1[2] = 'pink';
colors1[3] = 'blue';
colors1.length =4;

var colors2 = new Raid;
colors2[0] = 'white';
colors2[1] = 'black';
colors2[2] = 'violet';
colors2[3] = 'blue';
colors2.length =4;

var colors = colors1.concat(colors2)
console.log(colors);