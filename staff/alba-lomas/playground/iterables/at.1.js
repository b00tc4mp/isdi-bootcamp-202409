

var at = function (iterable, index) {

    if (index >= 0) {
        return iterable[index]
    }
    else {
        return iterable[iterable.length + index]
    }
}




var countries = { 0: 'French', 1: 'Germany', 2: 'Italy', 3: 'Spain', length: 5 };



console.log('CASE locate spain from countries')

var country = at(countries, 3)
console.log(country)
//Spain



console.log('CASE locate Germany from countries')

var country = at(countries, -3)
console.log(country)
// Germany 