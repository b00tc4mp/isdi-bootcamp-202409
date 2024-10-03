var numbers = [2, 4, 6]

var myForEach = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++) {
        callback(iterable[i])
    }
}

var obj = { length: 0 }
obj[0] = 'a';
obj[1] = 'b'
obj[2] = 'c'
obj.length = 3

myForEach(obj, function (char) {
    console.log(char)
})

///////

var names = ['liza', 'abel', 'shisho']

var myFEach = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++) {
        callback(iterable[i])
    }
}

var nom = { length: 0 }
nom[0] = 'liza'
nom[1] = 'abel'
nom[2] = 'shisho'
nom.length = 3

myFEach(nom, function (char) {
    console.log(char)
})

////

var myFunc = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++) {
        callback(iterable[i])
    }
}

var col = { length: 0 }
col[0] = 'red'
col[1] = 'blue'
col[2] = 'pink'
col.length = 3

myFunc(col, function (char) {
    console.log(char)
})

////
