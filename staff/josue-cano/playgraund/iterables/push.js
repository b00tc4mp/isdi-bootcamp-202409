
var push = 

function(iterable,element){
    iterable[iterable.length] = element;
    iterable.length++;
    return iterable.length;
}

console.log('Test PUSH');

console.log('CASE add 400 to nums');
 
var nums ={
    0:100,
    1:200,
    2:300,
    length:3
}

console.log(nums);
console.log(length);

console.log('CASE add banana to fruits');

var fruits ={
    0: 'apple',
    1: 'orange',
    2: 'pineapple',
    length:3
    
}

var length = push(fruits, 'banana');

console.log(fruits);
console.log(length);