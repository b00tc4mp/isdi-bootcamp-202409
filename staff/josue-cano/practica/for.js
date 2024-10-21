var push = function(iterables, elemento){
    iterables[iterables.length]=elemento;
    iterables.length++
    return iterables.length;

}

var animales = {
   0: "perro", 
   1: "gato", 
   2: "elefante", 
    3: "leon",
    length:3
}
console.log(animales);

var todo = push(animales,"pez");
console.log(animales);

