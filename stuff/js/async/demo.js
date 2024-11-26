console.log(new Date)
console.log('continue with more stuff...')
setTimeout(function () { console.log(new Date, 1, 'hola mundo') }, 10000)
var a = 1, b = 2, c = a + b
setTimeout(function () { console.log(new Date, 2, 'hola mundo') }, 8000)
console.log(c)