console.log ("Test Array.prototype.at");

console.log("Case get element with positive index");

var array1 = [5, 12, 8, 130, 44];

var index = 2;

console.log("An index of " + index + " returns " + array1.at(index));
// "An index of 2 returns 8"

console.log("Case get element with negative index");

index = -2;

console.log("An index of " + index + " returns " + array1.at(index));
// "An index of -2 returns 130"

