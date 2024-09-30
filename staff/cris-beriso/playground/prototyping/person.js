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

/* En vez de crear los objetos manualmente, pudiendo cometer errores al escribir. 
Usamos la functión constructora*/

var aaron = new Person('Aaron', 'Barrios', 26, 'Cornella')
var anna = new Person('Anna', 'Gonzalez', 27,)