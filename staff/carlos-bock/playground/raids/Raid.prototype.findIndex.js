var Raid = function (){
    this.length;
};

Raid.prototype.findIndex = function (callback) {
    for (var i = 0; i < this.length; i++ ) {
        if (callback(this[i]) == true){
            return i;
        }
    }
    return -1;
}

var city = new Raid;
city[0] = 'Madrid';
city[1] = 'Lisbon';
city[2] = 'Paris';
city[3] = 'Tokyo';
city[4] = 'Buenos Aires';
city.length = 5;

console.log("TEST Raid.prototype.findIndex");


var result = city.findIndex((word) => word.length > 5);
console.log(result);
// expect 0

var result2 = city.findIndex((word) => word.length > 50);
console.log(result2);
// expect -1

var result3 = city.findIndex((word) => word.length > 7);
console.log(result3);
//expect 4

