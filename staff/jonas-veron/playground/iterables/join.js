var join = function(iterable, separator){
    var newString = ''
    if(separator === undefined ){
        separator = ','
    }
    for(let i = 0; i < iterable.length; i++){
        i === 0 ? newString += iterable[i]
        : newString += separator + iterable[i]
    }
    return newString
}

var elements = {0: 'Fire', 1: 'Air', 2: 'Water', length: 3}

console.log('CASE argument undefined')

console.log(elements)
//'Fire', 'Air', 'Water'

var str = join(elements)
console.log(str);
//"Fire,Air,Water"


console.log('CASE with separator')

var str1 = join(elements, '-')
console.log(str1);
//"Fire-Air-Water"