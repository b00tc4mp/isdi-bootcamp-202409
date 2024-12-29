/*The reverse() method of Array instances reverses an array in place and returns the reference to the same array, the first array element now becoming the last, and the last array element becoming the first. In other words, elements order in the array will be turned towards the direction opposite to that previously stated.
To reverse the elements in an array without mutating the original array, use toReversed().*/


var barcos = ['Pinta', 'Niña', 'Santa María', 'Titanic', 'Bismark', 'Victory', 'Enterprise', 'Nautilus'];
var barcosCopy = ['Pinta', 'Niña', 'Santa María', 'Titanic', 'Bismark', 'Victory', 'Enterprise', 'Nautilus'];

/**
 * This is the standard join function: 
 */

console.log("CASE: Standard use of REVERSE function")
console.log("-------------------------------------")

var reversedBarcos = barcos.reverse();

console.log("The new reversedBarcos should return the array in reversed order");
console.log(reversedBarcos);
console.log("Take care, the original array will be muted too")
console.log(barcos);

console.log("");
console.log("If we wont mute the original array we should use function toReversed()");

var newReversedBarcos = barcosCopy.toReversed();
console.log("The new reversedBarcos should return the array in reversed order");
console.log(newReversedBarcos);
console.log("But now, the original array wond be mutated")
console.log(barcosCopy);


