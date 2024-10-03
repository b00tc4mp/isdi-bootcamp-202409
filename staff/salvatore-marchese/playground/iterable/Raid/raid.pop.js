var raid = function (iterable) {
    this.length = 0 
}

raid.prototype.pop = function () {
    //almacena el ultimo elemento en una variable
    var last = this[this.lenght]
    //borrando el ultimo elemento.
    delete this[this.length -1]
    // y disminuye el length 
    this.length--
    //te devuelve el ultimo elemento
    return last
}





var veggies = new raid 
veggies = [ 'broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato']
//veggies = [0: 'broccoli', 1: 'cauliflower', 2: 'cabbage', 3: 'kale', 4: 'tomato', veggies.lenght: 5]

var veggie = veggies.pop()
console.log(veggie)