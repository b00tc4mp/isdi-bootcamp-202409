var Raid = function () {   //La primera mayúscula nos indica que es una función constructora
    this.length = 0;
}

//Método?? He entendido que es el método para los elementos de ese objeto de tipo Raid
Raid.prototype.push = function (element) {
    this[this.length] = element;
    this.length += 1;
    return this.length;
}

//En este punto creamos una nueva variable de tipo Raid (y la hemos clerado con el constructor Raid)
var nums = new Raid //Raid()
var animals = new Raid;

animals[0] = 'tigre';
animals[1] = 'pantera';
animals[2] = 'puma';
animals[3] = 'leon';
animals.length = 4;

console.log(animals);



//Aquí iniciamos sus valores. 
nums[0] = 100;
nums[1] = 200;
nums[2] = 300;
nums.length = 3;

console.log(nums);

//Aquí instanciamos al método push del Raid para añadir un nuevo valor al objeto. 
var length = nums.push(400); //nums['push'](400)
var addAnimal = animals.push('leopardo')


console.log(nums);
console.log(animals);
console.log(length)