// concat multiple   arrays;
// refactor for objects after;

//can concat unlimited parameters;

//add each array at the end of the main array
//use for loops to iterate through each one.
//args is outter loop
//arr is innter loop

function concat() {
    const newArr = [];
    let totalLength = 0;
    let subLength = arguments[0].length;
    let argNum = 0;
    let counter = 0;
    const newarr = [];

    for (let i = 0; i < arguments.length; i++) {
        totalLength+= arguments[i].length;
    }

    for (let i = 0; i < totalLength; i++) {
        newarr[i] = arguments[argNum][counter]; 
        counter++;
        if (totalLength === subLength) break;
        if(i >= subLength-1){
            subLength+= arguments[argNum + 1].length;
            argNum++;
            counter = 0;
        }
    }

    return newarr;
}


//debugger;
const arg1 = [1,2,3];
const arg2 = [4,5,6];
const arg3 = [7,8,9];
const arg4 = [10];
console.log(concat(arg1, arg2, arg3, arg4));