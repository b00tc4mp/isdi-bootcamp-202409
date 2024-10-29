//The filter() method of Array instances creates a shallow copy of a portion of a given array, 
//filtered down to just the elements from the given array that pass the test implemented by the provided function.


let filter = function (iterable, callback) {
    var newObj = {};
    var j = 0; 

    for (let i = 0; i < iterable.length; i++) {
        if (callback(iterable[i]) == true){
            newObj[j] = iterable[i];
            j++;
        }
    }
    newObj.length = j;
    return newObj;
};


var obj1 = {0:'Madrid', 1:'Lisbon', 2:'Paris', 3:'Tokyo', 4:'Buenos Aires', length:5};
var result = filter(obj1,(word) => word.length > 5);
console.log(result);

