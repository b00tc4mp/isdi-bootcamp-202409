var barcos = {
    0: 'Pinta',
    1: 'Niña',
    2: 'Santa María',
    3: 'Titanic',
    4: 'Bismark',
    5: 'Victory',
    6: 'Enterprise',
    7: 'Nautilus',
    length: 8
};

//CASE: Personal reverse function using objects and returning one single object
// The function should receive an array and will return the reversed array. 
// As a second step, we can add a parameter to know if we want to modify the original object or not. 


var reverse = function (iterable) {
    var reversedIterable = { length: 0 };

    //console.log(iterable.length);

    for (i = iterable.length; i > 0; i--) {
        //console.log(iterable[i - 1]);
        reversedIterable[reversedIterable.length] = iterable[i - 1];
        reversedIterable.length++;
    }
    barcos = reversedIterable;

    return reversedIterable;
}


// The second parameter on the function let the function know if should modify the original array or not.
// If the second parameter is 'y': will mutate the original, if 'n': the original wont be mutated
console.log(reverse(barcos));

console.log(barcos);