
function map(iterable, callback){
    for (var i = 0; i < iterable.length; i++) {
        iterable[i] = callback(iterable[i]);
    }
    return iterable;
}

var obj1 = {0:5, 1:10, 2:15, 3:20, length:4};

function double(arg){arg = arg * 2; return arg};

console.log(map(obj1,double));