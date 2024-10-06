function unShift (iterable, newvalue) {
    //iterate array backwards and swap values to insert the final one at the begining. 
    for (var i = iterable.length; i > -1; i--) {
        iterable[i] = iterable[i-1];
        if (i === 0) iterable[0] = newvalue;
        
    }
    iterable.length++;
    //use recursion to solve if arguments are greater than 2
}

var obj1 = {0:1, 1:2, 2:3, 3:4, 4:5, 5:6, 6:7, length: 7}
var obj2 = {0: false, 1: false, 2: true, 3: false, length: 4};

console.log(unShift(obj1,0));
console.log(unShift(obj2,true));
console.log(obj1);
console.log(obj2);
// off by one likly around line 11;
// need to stop earlier

//version for objects 

