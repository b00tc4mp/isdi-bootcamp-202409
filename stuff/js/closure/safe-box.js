function safeBox(password, secret) {
    return function (_password) {
        if (password !== _password) throw new Error('wrong password')

        return secret
    }
}

var box = safeBox('123123123', 'a wendy le guta garfio (peter no lo sabe)')
var box2 = safeBox('234234234', 'peter sopecha que algo pasa...')

console.log(box('123123123'))
console.log(box2('234234234'))