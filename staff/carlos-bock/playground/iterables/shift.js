//removes the first element of the array 
//returns shifted value 
//modifies original array

function shift(iterable){

    var result = iterable[0];

    for (let i = 0; i < iterable.length-1; i++) {
        iterable[i] = iterable[i+1];
    }

    iterable.length--;
    return result;
}


// tdd
var obj1 = {0:1, 1:2, 2:3, 3:4, 4:5, 5:6, 6:7, length:7};
var obj2 = {0:false, 1:false, 2:true, 3:false, length:4};

console.log(shift(obj1));
console.log(shift(obj2));