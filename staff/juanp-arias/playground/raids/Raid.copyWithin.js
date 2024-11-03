console.log('TEST Raid.copyWithin')


var Raid = function () {
    this.length = 0
}

Raid.prototype.copyWithin = function (target, start) {
    //recorrer el iterable 
    //crear nueva variable
    //insertar objectos en nueva variable
    //retornar array anterior con copia
    var newNums = { length: 0 }
    for (var i = start; i < this.length; i++) {
        newNums[newNums.length] = this[i]
        newNums.length++
    }

    for (var i = 0; i < newNums.length - target; i++) {
        this[target + i] = newNums[i]

    } return this

}


console.log('CASE copy number 400 in iterable')

var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums[3] = 400
nums[4] = 500
nums.length = 5

console.log(nums.copyWithin(1, 3))

console.log(nums)
//{ 0: 100, 1: 400, 2: 500, 3: 400, 4: 500, length: 5 }



console.log('CASE copy horse in iterable')

var animals = new Raid
animals[0] = 'dog'
animals[1] = 'cat'
animals[2] = 'bear'
animals[3] = 'horse'
animals[4] = 'lion'
animals.length = 5
console.log(animals.copyWithin(1, 3))

console.log(animals)
//{ 0: 'lion', 1: 'horse', 2: 'bear', 3: 'cat', 4: 'horse', length: 5 }