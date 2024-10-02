console.log('TEST Raid.prototype.reverse')

var Raid = function(){
    this.length = 0
}

Raid.prototype.reverse = function(){
//un for con la condicion a la mitad
    for(var i = 0; i < Math.floor((this.length) / 2); i++){ 
        var element = this[i]//usamos una variable auxiliar para guardar el elemento
        this[i] = this[this.length - 1 - i]//igualamos el primer elemento con el ultimo
        this[this.length - 1 - i] = element //al ultimo le asignamos el elemento guardado
    }
    return this
}

var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300 
nums[3] = 400
nums[4] = 500
nums.length = 5

console.log(nums)
var result = nums.reverse()
console.log(result)
console.log(nums === result)