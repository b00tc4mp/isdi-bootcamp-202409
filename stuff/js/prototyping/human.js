var Human = function (name, dateOfBirth, weight, gender) {
    this.name = name
    this.dateOfBirth = dateOfBirth
    this.weight = weight
    this.gender = gender
}

Human.prototype.eat = function (food, weightGain) {
    console.log(this.name + ': eating ' + food)
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
// VM1303:24 Bart Simpson: giving sperm 💦
// VM1303:36 after 9 months...
// VM1303:19 Heidi Klum: giving birth 👶🏼

heidi.procreate(bart)
// VM1303:24 Bart Simpson: giving sperm 💦
// VM1303:36 after 9 months...
// VM1303:19 Heidi Klum: giving birth 👶🏼

heidi.procreate(heidi)
// VM1303:29 Uncaught Error: cannot procreate with same gender xx
//     at Human.procreate (<anonymous>:29:45)
//     at <anonymous>:1:7
// Human.procreate @ VM1303:29
// (anonymous) @ VM1412:1

bart.procreate(bart)
// VM1303:29 Uncaught Error: cannot procreate with same gender xy
//     at Human.procreate (<anonymous>:29:45)
//     at <anonymous>:1:6