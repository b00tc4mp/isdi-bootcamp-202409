/*
The splice() method of Array instances changes the contents of an array by 
removing or replacing existing elements and/or adding new elements in place.

To create a new array with a segment removed and/or replaced without mutating the 
original array, use toSpliced(). To access part of an array without modifying it, 
see slice().

Negative index counts back from the end of the array — if -array.length <= start < 0, start + array.length is used.
If start < -array.length, 0 is used.
If start >= array.length, no element will be deleted, but the method will behave as an adding function, adding as many elements as provided.
If start is omitted (and splice() is called with no arguments), nothing is deleted. This is different from passing undefined, which is converted to 0.

*/
//wip
function splice (iterable, start, deleteCount, items) {
    if (deleteCount === 0) {
        var i = start;
        var swap = iterable[i];
            iterable[i] = items;
            swap = iterable[i+1];
            i++; //maybe i+=2;
        while (i < iterable.length + 1) {
            iterable[i] = iterable[i+1];
            swap = iterable[i+1];
            i++;
        }
    }
    return iterable;
}


var obj4 = {0:'one', 1:'two', 2:'three', 3:'four', 4:'five', 5:'seven', 6: 'eight', length: 7};
var obj4 = {0:'one', 1:'two', 2:'three', 3:'four', 4:'five', 5:'six', 6:'seven', 7:'eight', length: 8};



const months = {0:'Jan', 1:'March', 2:'April', 3:'June', length:4};
months.splice(1, 0, 'Feb');
// Inserts at index 1
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');
// Replaces 1 element at index 4
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]
