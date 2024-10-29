// searches array for value that was passed in
// use a for loops to iterate through the array
// an if statement to compare the element 
// return the index (i) when a match is found
// if no match return -1 

function indexOf (arr, element, element2) {
    let i = 0;
    if (element2 !== undefined){
        i = element2;
    } else if(element2 < 0){
        
    };

    while (i < arr.length) {
        if (arr[i] === element){
            return i;
        }
        i++;
    }
    return -1;
}

//tdd 

var arr1 = [1, 2, 3, 4, 5, 6, 7, 1];
var obj1 = {0:1, 1:2, 2:3, 3:4, 4:5, 5:6, 6:7, length:7};
var arr2 = [false, false, true, false];

console.log(indexOf(arr1, 1));
debugger;
console.log(indexOf(arr1, 1, 2));
console.log(indexOf(arr1, 1, -2));
console.log(indexOf(obj1, 4));
console.log(indexOf(arr2, true));