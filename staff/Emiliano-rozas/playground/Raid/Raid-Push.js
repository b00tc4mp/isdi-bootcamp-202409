var Raid = function () {
    this.length = 0;
}

Raid.prototype.push = function () {
    for (var i = 0; i < arguments.length; i++) {
        this[this.length] = arguments[i]
        this.length++
    }
    return this.length
}


var pokemones = new Raid
pokemones[0] = "Bulbasaur"
pokemones[1] = "Squirtle"
pokemones[2] = "Charmander"
pokemones[3] = "Pikachu"
pokemones.length = 4


var pokemon = pokemones.push("Gengar")
console.log(pokemon)