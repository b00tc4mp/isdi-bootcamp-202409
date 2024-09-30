/*The shift() method of Array instances removes the first element from an array and returns that removed element. This method changes the length of the array.
The shift() method removes the element at the zeroth index and shifts the values at consecutive indexes down, then returns the removed value. If the length property is 0, undefined is returned.
*/


var myFish = ["angel", "clown", "mandarin", "surgeon"];

/**
 * This is the standard shift function: 
 */

console.log("myFish before:", myFish);
// myFish before: ['angel', 'clown', 'mandarin', 'surgeon']
console.log(myFish.length);

const shifted = myFish.shift();

console.log("myFish after:", myFish);
// myFish after: ['clown', 'mandarin', 'surgeon']

console.log("Removed this element:", shifted);
// Removed this element: angel
console.log(myFish.length);

