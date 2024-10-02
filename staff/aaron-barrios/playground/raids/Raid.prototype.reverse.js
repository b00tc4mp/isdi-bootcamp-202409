var Raid = function () {
    this.length = 0
}


Raid.prototype.reverse = function () {

    let length = this.length;

    for (let i = 0; i < Math.floor(length / 2); i++) {

        //variable que me guarda el valor del índice actual
        let currentValue
            = this[i];
        //de mi indice i cojo el indice total del iterable y le resto 1 y la i para cuando se incrementa
        this[i] = this[length - 1 - i]
        //invierto el valor del índice actual con el último
        this[length - 1 - i] = currentValue

    }
    return this
}

console.log('TEST Raid.prototype.reverse')

console.log('CASE get number reverse 300 in nums')

var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums[3] = 400
nums[4] = 500
nums.length = 5

var num = nums.reverse()
console.log(num)


