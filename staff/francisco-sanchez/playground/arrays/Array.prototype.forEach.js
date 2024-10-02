console.log("TEST Array.prototype.forEach");

console.log("CASE print characters in array");

var chars = ['a', 'b', 'c'];
var nums = [100, 200, 300];

//chars.forEach((element) => console.log(element));


//El forEach se encarga del cómo, no del que. 
//La función principal del forEach es ejecutar para cada elemento lo que tenga dentro. 

chars.forEach(function (element) {
    console.log(element);
})

// Expected output: "a"
// Expected output: "b"
// Expected output: "c"

var result = 0
nums.forEach(function (valores) {
    result += valores;
})
console.log(result);