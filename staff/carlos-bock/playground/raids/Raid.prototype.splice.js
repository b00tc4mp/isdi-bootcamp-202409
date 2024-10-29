var Raid = function () {
    this.length = 0;
};

Raid.prototype.splice = function (start, deleteCount) {
    if (arguments.length ===2) {
        var removed = {length: 0};

        for (var i = start; i < this.length; i++){
            var element = this[i];

            delete this[i];

            removed[removed.length] = element;
            removed.length++;
        }

        this.length -= removed.length;
        
        return removed;
    } else if (arguments.length === 3){
        var removed = {length: 0};
        
        for (var i = start; i < start + deleteCount; i++) {
            var element = this[i];
            delete this [i];

            removed[removed.length] = element;
            removed.length++;
        }

        for (var i = start + deleteCount; i < this.length; i++) {
            var element = this[i];
            this[i - deleteCount] = element;
        }

        for (var i = this.length - deleteCount; i < this.length; i++) {
            delete this[i];
        }
        this.length -= deleteCount;
        return removed;
    }
}

console.log("TEST Raid.prototype.splice");

console.log("CASE ");

var obj = new Raid;
obj[0] = 100;
obj[1] = 200;
obj[2] = 300;
obj[3] = 400;
obj[4] = 500;
obj[5] = 600;
obj[6] = 700;
obj.length = 7;

var result = obj.splice(1,2);
console.log(result);
//expect: {  '0': 200,  '1': 300,  '2': 400,  '3': 500,  '4': 600,  '5': 700,  length: 6}