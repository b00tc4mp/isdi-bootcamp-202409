var map = function(iterable, callback){
    var resultado = {length:0};
    for(var i = 0 ; i < iterable.length;i++){
        resultado[i] = callback (iterable[i])
        resultado.length++
    };
    return resultado;
};


var nums = { 
    0: 100,
    1: 200,
    2: 55,
    3: 11, 
    length: 4 };

    var esPar = function (valor){
            return valor % 2 == 0;
    };

    console.log(map(nums,esPar));