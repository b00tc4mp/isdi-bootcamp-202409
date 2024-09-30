console.log("Test iterables")
//if the search element is in the iterable return true
//else return false
//no partial match.
var includes = function (interable, searchElement) {
    for (let i = 0; i < interable.length; i++) {
        if (interable[i] === searchElement) return true;      
    }
    return false;
}

console.log("CASE find number 2 in numbers");

var numbers = {0:1, 1:2, 2:3, lenth:3};
var result = includes(numbers,2);
console.log(result)// expected output: true;

console.log("CASE find cat in pets");

const pets = {0:'cat', 1:'dog', 2:'bat', length:3};
var result1 = includes(pets, "cat");
console.log(result1);

var result2 = includes(pets, "cow");
console.log(result2);