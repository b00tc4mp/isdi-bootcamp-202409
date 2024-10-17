var Person = function (name, surname, age, city) {
    this.name = name
    this.surname = surname
    this.age = age
    this.city = city
}

Person.prototype.talk = function () {
    return this.name + ': 🗣️'
}

Person.prototype.eat = function () {
    return this.name + ': 🍔'
}

Person.prototype.pee = function () {
    return this.name + ': 💦'
}

Person.prototype.poo = function () {
    return this.name + ': 💩'
}

//var aaron = { name: 'Aaron', surname: 'Barrios', age: 26, city: 'Cornella' }
//var anna = { name: 'Anna', surname: 'Gonzalez', age: 27, city: 'Hospitalet' }
//var cisco = { name: 'Francisco', surname: 'Sanchez', age: 39, city: 'Barcelona' }
// ...

var aaron = new Person('Aaron', 'Barrios', 26, 'Cornella')
var anna = new Person('Anna', 'Gonzalez', 27, 'Hospitalet')
var cisco = new Person('Francisco', 'Sanchez', 39, 'Barcelona')

cisco.run20kmh = function () { return this.name + ': 🏃‍♂️💨 20km/h ...' }
cisco.poo = function () { return this.name + ': NOOP' }


var students = [aaron, anna, cisco, /* ... */]

console.log(aaron.talk())
console.log(anna.talk())
console.log(cisco.talk())
console.log(cisco.run20kmh())
console.log(anna.eat())
console.log(aaron.pee())
console.log(cisco.poo())


// VM953: 39 Aaron: 🗣️
// VM953: 40 Anna: 🗣️
// VM953: 41 Francisco: 🗣️
// VM953: 42 Francisco: 🏃‍♂️💨 20km / h ...
// VM953: 43 Anna: 🍔
// VM953: 44 Aaron: 💦
// VM953: 45 Francisco: NOOP
// undefined