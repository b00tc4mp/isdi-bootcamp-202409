/*The unshift() method of Array instances adds the specified elements to the beginning of an array and returns the new length of the array.

unshift()
unshift(element1)
unshift(element1, element2)
unshift(element1, element2, …, elementN)

let arr = [4, 5, 6];

arr.unshift(1, 2, 3);
console.log(arr);
// [1, 2, 3, 4, 5, 6]

arr = [4, 5, 6]; // resetting the array

arr.unshift(1);
arr.unshift(2);
arr.unshift(3);

console.log(arr);
// [3, 2, 1, 4, 5, 6]
*/


var programmingLanguages = ["javascript", "C", "php", "html", "css", "python"];

/**
 * This is the standard unshift function: 
 */

console.log("programmingLanguages before:", programmingLanguages);
// programmingLanguages before: ['javascript', 'C', 'php', 'html', 'css', 'python']
console.log(programmingLanguages.length);

const unshifted = programmingLanguages.unshift('R', 'C#');

console.log("programmingLanguages after:", programmingLanguages);
// programmingLanguages after: ['R', 'C#', 'javascript', 'C', 'php', 'html', 'css', 'python']

console.log("Added element:", unshifted);
// Removed this element: angel
console.log(programmingLanguages.length);

