//removes the first element of the array 
//returns shifted value 
//modifies original array

function shift(arr){

    var result = arr[0];

    for (let i = 0; i < arr.length-1; i++) {
        arr[i] = arr[i+1];
    }

    arr.length--;
    return result;
}







// tdd
var arr1 = [1, 2, 3, 4, 5, 6, 7];
var arr2 = [false, false, true, false];

console.log(shift(arr1));
console.log(shift(arr2));