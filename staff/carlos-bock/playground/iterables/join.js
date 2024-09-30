// takes elements of an array and stringafies and joins them
// if a second paramenter is passed that string element is inserted in between each string addition


function join(){
    let arr = arguments[0];
    let newStr = '';
    let str = '';
    if (typeof arguments[1] === "string") {
        str = arguments[1];
    }

    for (let i = 0; i < arr.length; i++) {
        newStr+= arr[i];
        if (str === arguments[1]) {
            newStr += str;
        };
    };

    return newStr;
}

const arr = ["Let's", 'play', 'mario', 'kart'];
const elements = ['Fire', 'Air', 'Water'];
debugger;
console.log(join(arr, " "));

