var fin = { meta: "tachaaan"};
var a = {name: "cris",
            surname: "beriso",
            siuu : b}

var b = {lalala: "ey",
    css: "caca",
    jiji:fin,
}

var c ={js : "nice",
    93: a
}


var sherlock = {
    surname :"Holmes",
    address:{
        city: "London",
    }
}

var john = {
    surname: "watson",
    address: sherlock.address
}

john.surname = "lennon";


var f = function (name, surname) {
    
    return `hello  ${name} + ${surname}`;

    
}
f('jonas', 'veron')
