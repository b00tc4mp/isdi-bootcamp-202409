var Raid = function() {
    this.length = 0;
};
Raid.prototype.filter = function(callback) {
    var newObj = {};
    var j = 0; 

    for (let i = 0; i < this.length; i++) {
        if (callback(this[i]) == true){
            newObj[j] = this[i];
            j++;
        }
    }
    newObj.length = j;
    return newObj;
};

console.log('TEST Raid.prototype.filter');
console.log('CASE find cities longer than 5 characters');
var obj = new Raid;
obj[0] = 'Madrid'; // update iterable then test
obj[1] = 'Lisbon';
obj[2] = 'Paris';
obj[3] = 'Tokyo';
obj[4] = 'Buenos Aires';
obj.length = 5;
var result = obj.filter((word) => word.length > 5);
console.log(result);
//expect { '0': 'Madrid', '1': 'Lisbon', '2': 'Buenos Aires', length: 3 }

