/*
The copyWithin() method of Array instances shallow copies part of this array 
to another location in the same array and returns this array without modifying its length.
*/

// need to update logic

//WIP
function copyWithin() {
    let i = 1;
    let length = arguments.length -1;

    while (i < length){
        arguments[0][arguments[i]] = arguments[0][arguments[i+1]]
        i++;
    }
};



function copyWithin2(array,...indexes){
    let i = 0;
    let length = indexes.length-1

    while (i<length) {
        array[indexes[i]] = array[indexes[i+1]] 
        i++;
    }
    return array;
};



const array1 = ['a', 'b', 'c', 'd', 'e'];
var obj1 = {0:'a', 1:'b', 2:'c', 3:'d', 4:'e', length:5};


// Copy to index 0 the element at index 3
//console.log(array1.copyWithin(0, 3, 4));
// Expected output: Array ["d", "b", "c", "d", "e"]

// Copy to index 1 all elements from index 3 to the end
//console.log(array1.copyWithin(1, 3));
// Expected output: Array ["d", "d", "e", "d", "e"]


/*
start
Zero-based index at which to start copying elements from, converted to an integer.

Negative index counts back from the end of the array — if -array.length <= start < 0, start + array.length is used.
If start < -array.length, 0 is used.
If start >= array.length, nothing is copied.
end Optional
Zero-based index at which to end copying elements from, converted to an integer. copyWithin() copies up to but not including end.

Negative index counts back from the end of the array — if -array.length <= end < 0, end + array.length is used.
If end < -array.length, 0 is used.
If end >= array.length or end is omitted, array.length is used, causing all elements until the end to be copied.
If end implies a position before or at the position that start implies, nothing is copied.
Return value
The modified array.*/