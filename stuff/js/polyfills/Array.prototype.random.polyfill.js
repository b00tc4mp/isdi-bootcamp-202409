// let's imagine all navigators have random method, but mine

// then use this polyfill
if (Array.prototype.random === undefined)
    Array.prototype.random = function () {
        var index = Math.floor(Math.random() * this.length)

        return this[index]
    }

var a = [10, 20, 30]
var element = a.random()
console.log(element)
// 30

var online = [
    'Carlos Bock',
    'Cris Beriso',
    'Rafael Infante',
    'Angel Ruan',
    'Jhonatan Gilardi',
]
online.shuffle()
console.log('online', online)

var onsite = [
    'Aaron Barrios',
    'Abel Márquez',
    'Alba Lomas',
    'Aleix Palau Rufach',
    'Anna Gonzalez',
    'Carlos Tomas',
    'Claudi Cano',
    'Emiliano Rozas',
    'Francisco S.',
    'Javier Romera',
    'Jonas Veron',
    'Josué Cano',
    'Juan Pablo Arias',
    'Luis Morlets',
    'Pablo Delgado',
    'Salva Marchese',
    'Victoria Kolomytseva',
]
onsite.shuffle()
console.log('onsite', onsite)