
var find = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++ ) {
        if (callback(iterable[i]) == true){
            return i;
        }
    }
    return -1;
}

var obj1 = {0:'Madrid', 1:'Lisbon', 2:'Paris', 3:'Tokyo', 4:'Buenos Aires', length:5};
var result = find(obj1,(word) => word.length > 5);
console.log(result);
// expect 0

var obj2 = {0:'Madrid', 1:'Lisbon', 2:'Paris', 3:'Tokyo', 4:'Buenos Aires', length:5};
var result2 = find(obj2,(word) => word.length > 50);
console.log(result2);
// expect -1


var obj3 = {0:'Madrid', 1:'Lisbon', 2:'Paris', 3:'Tokyo', 4:'Buenos Aires', length:5};
var result3 = find(obj3,(word) => word.length > 7);
console.log(result3);
//expect 4