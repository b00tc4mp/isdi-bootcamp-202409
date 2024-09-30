// searches array for the last instance of the value that was passed in
// use a for loops to iterate through the array
// an if statement to compare the element 
// return the index (i) when a match is found
// if no match return -1 

function indexOf (arr, element) {

    for (let i = arr.length-1; i > 0; i--) {
        if (arr[i] === element) {
            return i;
        }       
    }
    return -1;
}

//tdd 

var arr1 = [1, 2, 3, 4, 5, 6, 4, 7];
var arr2 = [false, false, true, false, true];

console.log(indexOf(arr1, 4));
console.log(indexOf(arr2, true));