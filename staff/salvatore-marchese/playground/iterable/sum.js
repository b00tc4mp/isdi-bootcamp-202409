//funcion sum

function sum(arr, n) {
    if (n <= 0) {
        return 0;
    } else {
        return sum(arr, n - 1) + arr[n - 1];
    }
}



// Simple array of 3 numbers example#1
var arr = [10, 20, 30];  
console.log(sum(arr, 3));


function sum(arr, n) {
    if (n <= 0) {
        return 0;
    } else {
        return sum(arr, n - 1) + arr[n - 1];
    }
}
//return 60 > [10+20+30] sum the element inside the array



// Simple array of 3 numbers example#2
var arr = [10, 20, 30];  
console.log(sum(arr, 1));

undefined
function sum(arr, n) {
    if (n <= 0) {
        return 0;
    } else {
        return sum(arr, n - 1) + arr[n - 1];
    }
}
//return 10 > [10] sum the element inside the array by calling the element, in this case 1 elemento posicion 0



// Simple array of 3 numbers example#3
var arr = [10, 20, 30];  
console.log(sum(arr, 2));

undefined
function sum(arr, n) {
    if (n <= 0) {
        return 0;
    } else {
        return sum(arr, n - 1) + arr[n - 1];
    }
}
//return 10 > [10] sum the element inside the array by calling the element, in this case 1 elemento posicion 0




// Simple array of 3 numbers example#4
var arr = [10, 20, 30];  
console.log(sum(arr, 4));

// return Nan, because there are not 4 elemnts in the array
