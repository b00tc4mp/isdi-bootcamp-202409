function ObjectId(id) {
    if (arguments.length === 0)
        this.id = (Date.now() + Math.random()).toString(36)
    else
        this.id = id
}

ObjectId.fromNumber = function (number) {
    return new ObjectId(number.toString(36))
}

console.log(new ObjectId)
console.log(new ObjectId('asdfasdf0.asdf'))
console.log(ObjectId.fromNumber(1231231029301283.12312231231))
// VM728:12 ObjectId {id: 'm3e8ik93.cqs'}
// VM728:13 ObjectId {id: 'asdfasdf0.asdf'}
// VM728:14 ObjectId {id: 'c4fnq5ei3n'}