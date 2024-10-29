var Raid = function () {
    this.length = 0;
};

Raid.prototype.slice = function (args) {
    var newObj = {};
    var counter = 0;
    var number1 = 0;
    var number2 = this.length;

    if (arguments[0] < 0) {number1 = this.length + arguments[0]}
        else if (arguments[0] > 0) {number1 = arguments[0]};
    if (arguments[1] < 0) {number2 = this.length + arguments[1]}
        else if (arguments[1] > 0) {number2 = arguments[1]};


    for (var i = number1; i < number2; i++) {
        newObj[counter] = this[i];
        counter++;
    }
    newObj.length = counter-1;
    return newObj;
};

console.log("TEST Raid.prototype.slice");

console.log("CASE ");

var obj = new Raid;
obj[0] = 'one';
obj[1] = 'two';
obj[2] = 'three';
obj[3] = 'four';
obj[4] = 'five';
obj[5] = 'six';
obj[6] = 'seven';
obj[7] = 'eight';
obj.length = 8;

var result = obj.slice(2);
console.log(result);
// expect {'0':'three','1':'four','2':'five','3':'six','4':'seven','5':'eight',length:5}
console.log(obj.slice(-2));
// expect { '0': 'seven', '1': 'eight', length: 1 }
console.log(obj.slice(1,5));
//{ '0': 'two', '1': 'three', '2': 'four', '3': 'five', length: 3 }
