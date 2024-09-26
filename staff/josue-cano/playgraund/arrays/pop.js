var pop = 

function(iterable){
    var last = iterable[iterable.length - 1];
    delete iterable[iterable.length - 1];
   iterable.length--;
   return last;
}

console.log('Test pop');

console.log('CASE add 400 to nums');
 
var nums ={
    0:100,
    1:200,
    2:300,
    length:3
}

console.log(nums);
console.log(num);

console.log('CASE add banana to fruits');

var fruits ={
    0: 'apple',
    1: 'orange',
    2: 'pineapple',
    length:3
    
}

var fruit = pop(fruits);

console.log(fruits);
console.log(fruit);