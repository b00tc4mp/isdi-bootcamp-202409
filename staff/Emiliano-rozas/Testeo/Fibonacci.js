//Fibonacci
//0, 1, 1, 2, 3, 5, ...
// n =  0 -> 0
// n =  1 -> 1
// n =  2 -> 1 + 0
// n =  3 -> 

/*var fibonacci = function (n){
    if (n < 2) { 
    return n}
    return fibonacci(n - 2) + fibonacci(n - 1)
}
*/


var fibonacci = function (n) {
    var fib = [0, 1]
    for (var i = 2; i <= n; i++) {
        fib[i] = fib[i - 2] + fib[i - 1]
    }
    return fib[n]
}

console.log(fibonacci(1))
console.log(fibonacci(2))
console.log(fibonacci(3))
console.log(fibonacci(4))
console.log(fibonacci(5))
console.log(fibonacci(6))
console.log(fibonacci(7))
console.log(fibonacci(8))
console.log(fibonacci(9))
console.log(fibonacci(10))
console.log(fibonacci(11))
console.log(fibonacci(12))

