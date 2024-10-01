var colors = { 0:'red', 1:'blue', 2:'yellow', length: 3 }
var color = includes('blue')

var includes = function (iterable, searchElement) {
    for (var i = 0; i<iterable.length; i++){
        var element = iterable[i]
        if (element === searchElement) {
            return true
        }
    }
    return 'a lo mejor'
}
console.log(color)
