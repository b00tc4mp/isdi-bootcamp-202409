var Raid = function () {
    this.length = 0
}


Raid.prototype.indexOf = function (searchElement, fromIndex) {
    //Si existe el argumento fromIndex, empezar la busqueda ahi, si no existe será 0
    if (!fromIndex) {
        fromIndex = 0;
    }
    else if (fromIndex < 0) {
        fromIndex = this.length + fromIndex
    }

    //Recorrer el iterable en busca del elemento
    for (i = fromIndex; i < this.length; i++) {
        //Si coindicen, devolver el índice de ese elemento
        if (this[i] === searchElement) {
            return i
        }
    }
    //Y si no lo encuentra, devolver un -1
    return -1
}

console.log('TEST Raid.prototype.indexOf')

console.log('CASE get number indexOf 300 in nums')

var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums[3] = 400
nums[4] = 500
nums.length = 5

var num = nums.indexOf(300)
console.log(num)
// 2



console.log('CASE get number indexOf 8 in nums')

var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums[3] = 400
nums[4] = 500
nums.length = 5

var num = nums.indexOf(8)
console.log(num)
// -1


console.log('CASE get number indexOf 300 in nums')

var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums[3] = 400
nums[4] = 500
nums[5] = 300
nums.length = 6

var num = nums.indexOf(300, -1)
console.log(num)
// 5


console.log('CASE get number indexOf 300 in nums')

var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums[3] = 400
nums[4] = 500
nums[5] = 300
nums.length = 6

var num = nums.indexOf(300, -4)
console.log(num)
// 2