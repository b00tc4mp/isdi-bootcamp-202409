console.log("TEST Array.prototype.forEach");

console.log("CASE print characters in array");

var chars = ['a', 'b', 'c']

//chars.forEach((element) => console.log(element));

chars.forEach(function (element) {
    console.log(element);
})

// Expected output: "a"
// Expected output: "b"
// Expected output: "c"


//-------------------------

var chars2 = { 0: 'a', 1: 'b', 2: 'c', length: 3 }