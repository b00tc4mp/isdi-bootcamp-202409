window.name = 'Window'

//function hello(to) {
//    return this.name + ': Hello, ' + to + '!'
//}

var hello = function (to) {
    //return this.name + ': Hello, ' + to + '!'
    return this['name'] + ': Hello, ' + to + '!'
}

//console.log(hello('Alba'))
console.log(window.hello('Alba'))
//': Hello, Alba!'

var peter = { name: 'Peter' }
peter.hello = hello
//console.log(peter.hello('Wendy'))
//console.log(peter['hello']('Wendy'))
//console.log(hello.call(peter, 'Wendy'))
console.log(hello.apply(peter, ['Wendy']))
//Peter: Hello, Wendy!

var wendy = { name: 'Wendy' }
wendy.hello = hello
//console.log(wendy.hello('Peter'))
console.log(hello.call(wendy, 'Peter'))

var add = function (a, b) {
    return this.name + ': ' + (a + b)
}

//console.log(add(1, 2))
console.log(window.add(1, 2))
//Window: 3

console.log(add.call(peter, 1, 2))
console.log(add.apply(peter, [1, 2]))
console.log(add.apply(peter, { 0: 1, 1: 2, length: 2 }))
//console.log(add.bind(peter)(1, 2))
var bindedAdd = add.bind(peter)
console.log(bindedAdd(1, 2))
console.log(bindedAdd === add)

function bind(funktion, context) {
    return function () { // new Function
        return funktion.apply(context, arguments)
    }
}

var bindedAdd = bind(add, peter)
console.log(bindedAdd(1, 2))

//var bindedAdd2 = bind(add, wendy)
var bindedAdd2 = add.bind(wendy)
console.log(bindedAdd2(3, 4))
//var bindedAdd3 = bind(bindedAdd2, peter)
var bindedAdd3 = bindedAdd2.bind(peter)
console.log(bindedAdd3(5, 6))

console.log(bindedAdd2(10, 20))
console.log(bindedAdd2(30, 40))
console.log(bindedAdd2(50, 60))

wendy.add = add
console.log(wendy.add(100, 200))