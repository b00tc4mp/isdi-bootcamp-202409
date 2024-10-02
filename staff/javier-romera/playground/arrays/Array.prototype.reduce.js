console.log('Array.prototype.reduce')

console.log('CASE sum all numbers with an initial value of 0')

var numbers = [1, 2, 3, 4];

var initialValue = 0;
// var sumWithInitial = numbers.reduce(
//     (accumulator, currentValue) => accumulator + currentValue,
//     initialValue,
// )

var sumWithInitial = numbers.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue
}, initialValue)

console.log(sumWithInitial)
// 10

console.log('CASE sum all numbers with an initial value of 5')

var numbers = [1, 2, 3, 4];

var initialValue = 5;

var sumWithInitial = numbers.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue
}, initialValue)

console.log(sumWithInitial)
// 15