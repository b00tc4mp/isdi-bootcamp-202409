var Raid = function () {
    this.length = 0;
}

Raid.prototype.indexOf = function (element, element2){
    if (element2 !== undefined){
        let i = element2;
        while (i < this.length) {
            if (this[i] === element){
                return i;
            }
            i++;
        }
    } else {
            for (let i = 0; i < this.length; i++) {
                if (this[i] === element) {
                return i;
                 }       
            }
        }
    return -1;
}

console.log("TEST Raid.prototype.indexOF");

console.log("CASE find index of 4");

var nums = new Raid;
nums[0] = 1;
nums[1] = 2;
nums[2] = 3;
nums[3] = 4;
nums[4] = 5;
nums[5] = 6;
nums[6] = 7;
nums.length = 7;

var num = nums.indexOf(4)
console.log(num)
//expect 3