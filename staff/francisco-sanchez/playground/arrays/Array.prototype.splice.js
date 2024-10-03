/** 
 * SPLICE
 * El método splice() cambia el contenido de un array eliminando elementos existentes y/o agregando nuevos elementos.
 * array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
 * Ref: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
 * 
 */

console.log('TEST Array.prototype.splice');

console.log('CASE 1: Extract elements from index 2.');

var nums = [100, 200, 300, 400, 500, 600, 700];
var extracted = nums.splice(3);
console.log(nums);
//[ 100, 200, 300 ]
console.log(extracted);
//[ 400, 500, 600, 700 ]