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

var obj1 = {0:1, 1:2, 2:3, 3:4, 4:5, 5:6, 6:4, 7:7, length:8};
var obj2 = {0:false, 1:false, 2: true, 3:false, 4:true, length:5};

console.log(indexOf(obj1, 4));
console.log(indexOf(obj2, true));