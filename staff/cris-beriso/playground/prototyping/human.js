var Human = function (name, dateOfBirth, weight, gender) {
    this.name = name
    this.dateOfBirth = dateOfBirth
    this.weight = weight
    this.gender = gender
}

Human.prototype.eat = function (food, weightGain) {
    console.log(this.name + ': eating' + food)
    this.weight += weightGain
}

Human.prototype.run = function (weightLoss) {
    console.log(this.name + ': running 🏃')
    this.weight -= weightLoss
}

Human.prototype.giveBirth = function () {
    if (this.gender === 'xx') console.log(this.name + ': giving birth 👶🏼')
    else throw new Error(this.name + ' is not xx')
}

Human.prototype.giveSperm = function () {
    if (this.gender === 'xy') console.log(this.name + ': giving sperm 💦')
    else throw new Error(this.name + ' is not xy')
}

Human.prototype.procreate = function (human) {
    if (this.gender === human.gender) throw new Error('cannot procreate with same gender ' + this.gender)
    else {
        if (this.gender === 'xy')
            this.giveSperm()
        else
            human.giveSperm()

        console.log('after 9 months...')

        if (this.gender === 'xx')
            this.giveBirth()
        else
            human.giveBirth()
    }
}

var bart = new Human('Bart Simpson', new Date(2000, 0, 1), 3, 'xy')

var heidi = new Human('Heidi Klum', new Date(2002, 10, 10), 2.5, 'xx')

bart.procreate(heidi)
/*
Bart Simpson: giving sperm 💦
after 9 months...
Heidi Klum: giving birth 👶🏼
*/

heidi.procreate(bart)
/*
Bart Simpson: giving sperm 💦
after 9 months...
Heidi Klum: giving birth 👶🏼
*/

heidi.procreate(heidi) // Error

bart.procreate(bart) // Error