


var Raid = function () {
    this.length = 0
}

Raid.prototype.indexOf = function (searchelement, fromIndex) {

    if (fromIndex === undefined) {
        fromIndex = 0;
    }
    else if (fromIndex < 0) 
        fromIndex = fromIndex + this.length;
    
    for ( var i = fromIndex; i < this.length;) {
        
        var element = this[i];

        if (element === searchelement)

            return i
    }
    return -1

}

var colors = new Raid
colors [0] = 'red',
colors [1] = 'blue',
colors [2] = 'yellow',
colors [3] = 'green',
colors [4] = 'purple',
colors [5] = 'pink',
colors.length = 6;

var index = indexOf(colors, 'green')
console.log(index)

index = indexOf(colors, 'green', -2)
console.log(index)