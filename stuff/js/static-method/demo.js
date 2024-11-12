class ObjectId {
    constructor(id) {
        if (arguments.length === 0)
            this.id = (Date.now() + Math.random()).toString(36)
        else
            this.id = id
    }

    static fromNumber(number) {
        return new ObjectId(number.toString(36))
    }
}

console.log(new ObjectId)
console.log(new ObjectId('asdfasdf0.asdf'))
console.log(ObjectId.fromNumber(1231231029301283.12312231231))

// VM814:14 ObjectId {id: 'm3e8khz2.1kc'}
// VM814:15 ObjectId {id: 'asdfasdf0.asdf'}
// VM814:16 ObjectId {id: 'c4fnq5ei3n'}