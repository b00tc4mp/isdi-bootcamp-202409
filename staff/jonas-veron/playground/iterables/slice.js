    //recorrer el array eliminar los primeros n elementos y descontar el length
    //{0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5}
    //{0: 'b', 1: 'c', 2: 'd', 3: 'e', length: 4}
    //{0: 'c', 1: 'd', 2: 'e', length: 3}


    var slice = function(iterable, startIndex, indexEnd){
        var result = {length:0}
        if(arguments.length === 1){
            startIndex = 0
        }
        //comprobamos si  el indice es positivo o negativo
        var start = (startIndex >= 0 ? startIndex : startIndex + iterable.length)
        //comprobamos si indexEnd es positivo o negativo
        var end = (indexEnd > 0 ? indexEnd : indexEnd < 0 ? indexEnd + iterable.length : iterable.length)
        //recorremos el iterable con los parametros correctos
        for(var i = start; i < end; i++){
            var item = iterable[i]
        // lo asignamos a la variable result
            result[result.length] = item
            result.length++
        }
        return result
    }

    console.log('CASE an argument to start the iterable')
    var letters = {0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5}
    var result = slice(letters, 2)
    console.log(result)
    //{0: 'c', 1: 'd', 2: 'e', length: 3}

    console.log('CASE an ')

    var letters1 = {0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5}
    var result1 = slice(letters1, 2, 4) //4 no inclusive
    console.log(result1)
    //{0: 'c', 1: 'd', length: 2}

    console.log('CASE an argument negative to start the iterable')
    var letters = {0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5}
    var result = slice(letters, -2)
    console.log(result)
    //{0: d, 1: e, length: 2}

    console.log('CASE and negative index')

    var animals = {0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'elephant', length: 5}
    var result3 = slice(animals, 2, -1)
    //{0: 'camel', 1: 'duck', length: 2}
    console.log(result3)

    var animals = {0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'elephant', length: 5}
    var result4 = slice(animals)
    //{0: 'camel', 1: 'duck', length: 2}
    console.log(result4)

