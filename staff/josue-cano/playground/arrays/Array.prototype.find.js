console.log('TEST Array.prototype.find')


var numes = [1, 3, 7, 9, 2];

var found = nums.find(function (element) { return element > 10 });

console.log(found);

// --------------------------------------------------------------------------------------------------
console.log("find firstname with length lower than 3")

var names = ["peter", "leo", "juan", "io"]

var found = names.find(function (name) { return name.length < 3 })

console.log(found);//io




var frutas= [
    {brand: "Nike", model: "Air Max", quantity: 2},
    {brand: "Puma", model: "Gatopardo", quantity: 1},
    {brand: "Adidas", model: "Black", quantity: 7},
    {brand: "Santacruz", model: "longboard", quantity: 4},
    
    ]
     
    var product = cart.find(function(product){
        return product.quantity > 5;
    })
    
    