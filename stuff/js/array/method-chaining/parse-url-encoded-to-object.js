const data = 'username=peterpan&password=123123123'.split('&').map(keyValue => keyValue.split('=')).reduce((object, keyValue) => {
    object[keyValue[0]] = keyValue[1]

    return object
}, {})

console.log(data)
// { username: 'peterpan', password: '123123123' }