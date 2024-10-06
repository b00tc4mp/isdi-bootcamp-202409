// takes elements of an array and stringafies and joins them
// if a second paramenter is passed that string element is inserted in between each string addition


function join(){
    var arr = arguments[0];
    var newStr = '';
    var str = '';
    if (typeof arguments[1] === "string") {
        str = arguments[1];
    }

    for (var i = 0; i < arr.length; i++) {
        newStr+= arr[i];
        if (str === arguments[1]) {
            newStr += str;
        };
    };

    return newStr;
}

var obj1 = {0:"Let's", 1:"play", 2:"mario", 3:"kart", length:4};
var obj2 = {0:"Fire", 1:"Air", 2:"Water", length:3};

console.log(join(obj1, " "));
console.log(join(obj2,""));

