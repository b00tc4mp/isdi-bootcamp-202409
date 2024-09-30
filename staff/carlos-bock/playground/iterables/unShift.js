// inserts value at begining of array;
//modifies original array
//returns new length of array;
//interate through the arguments
//iterate through the array 
function unShift(){
    let arr = arguments[0]
    for (let i = 1; i < arguments.length; i++) {
        arr[arr.length] = arguments[i]
        for (let j = 0; j < arr.length; j++) {
            arr[arr.length - 2 - j] = arr[arr.length - 1 -j]; 
            
        }
        // if array length ad
    }
    return arr.length;
}

var arr1 = [1, 2, 3, 4, 5, 6, 7];
var arr2 = [false, false, true, false];
var obj1 = {0: false, 1: false, 2: true, 3: false, length: 4};

//console.log(unShift(arr1,"a","b","c"));
//console.log(unShift(arr2,"a","b","c"));


// off by one likly around line 11;
// need to stop earlier

//version for objects 

