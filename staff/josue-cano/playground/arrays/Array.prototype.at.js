//At sirve para moverte por el indice , permite tambien contar con numeros negativos
//si es negativo empieza a contar desde el final

console.log('TEST Array.prototype.at()');

// Caso 1:
console.log('CASE access second and last element of nums');


var nums = [100, 200, 300, 400];

console.log(nums); // [100, 200, 300, 400]

console.log(nums.at(1));  //  200
console.log(nums.at(-1)); // 400 (último elemento)

// Caso 2:
console.log('CASE access first and last element of fruits');

var fruits = ['apple', 'orange', 'pineapple', 'banana'];

console.log(fruits); // ['apple', 'orange', 'pineapple', 'banana']

console.log(fruits.at(0));  //apple
console.log(fruits.at(-1)); //  banana
