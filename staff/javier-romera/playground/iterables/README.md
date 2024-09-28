# Iterables
En este README.md hablaré de los archvios que tengan un 1 en el nombre, por ejemplo: "at1.js", no "at.js", "concat1.js", no "concat.js", etc... (refiriendome a las funciones que he hecho y estan en mi github)

Aviso: en algun apartado hay referencias a otros apartados, por lo que quizás hay alguna parte que no esta explicada al 100% porque está explicada en ese otro apartado.

- function [at](#function-at)
- function [concat](#function-concat)
- function [indexOf](#function-indexOf)
- function [join](#function-join)
- function [lastIndexOf](#function-lastIndexOf)
- function [pop](#function-pop)
- function [push](#function-push)
- function [reverse](#function-reverse)
- function [shift](#function-shift)
- function [unshift](#function-unshift)

## function-at

```js
var at = function (iterable, index) {
    return index < -iterable.length || index >= iterable.length ? 'out of index' : (index > 0 ? iterable[index] : iterable[index + iterable.length])
}
```
La función at sirve para ver que valor tiene un elemento "x" en un objeto iterable.

En la primera linea declaramos la función, y vemos que acepta dos argumentos; el primero es el objeto iterable que le pasaremos a la función y el indice en el que queremos saber qué valor hay.

Dentro de la función tenemos un return con un ternario.

En la primera parte del ternario:

```js
index < -iterable.length || index >= iterable.length ? 'out of index'
```

En esta primera condición le decimos al return que en caso de que el indice introducido en la funcion se sale del margen tanto positivo como negativo de la length de nuestro iterable, devuelva por consola un 'out of index', para señalar que el indice introducido por el usuario no existe dentro del iterable.

En la segunda y tercera parte del ternario:

```js
: (index > 0 ? iterable[index] : iterable[index + iterable.length])
```

Si el indice introducido es válido (es decir, ha superado el cortafuegos de la primera parte del ternario), le decimos que: en caso de ser un indice positivo, devuelva esa misma posición, y por último, en caso de que el indice esté dentro del rango de la length de nuestro iterable pero NO sea positivo, devolvemos la posición del iterable sumándole la length del mismo, y de esta manera conseguimos que al introducir un indice negativo, contemos el iterable "desde atrás".

## function-concat

```js
var concat = function (iterables) {
    var newObj = new Object
    var p = 0; //para asignar las propiedades del nuevo objeto
    for (var i = 0; i < arguments.length; i++) {
        for (var j = 0; j < arguments[i].length; j++) {
            newObj[p] = arguments[i][j]
            p++
        }
    }
    newObj.length = p
    return newObj
}
```

La función concat sirve para crear un nuevo objeto iterable que sea la concatenación de los iterables introducidos a la función concat.

Dentro de la función tenemos varios elementos, empecemos por las primeras declaraciones de variables:

```js
var newObj = new Object
var p = 0; //para asignar las propiedades del nuevo objeto
```

En primer lugar creamos el nuevo objeto que va a ser el resultado de la concatenación de todos los iterables que le pasemos. En segundo lugar creamosuna variable "p", que más tarde nos servirá para asignarle a este nuevo objeto las propiedades de los iterables que enviemos a la función (con un poco de suerte más tarde quedara más clara la función de esta variable "p").

Después de las declaraciones de estas dos variables, tenemos un bucle for con otro bucle for adentro:

```js
for (var i = 0; i < arguments.length; i++) {
        for (var j = 0; j < arguments[i].length; j++) {
            newObj[p] = arguments[i][j]
            p++
        }
    }
```

Vayamos por partes, vamos a ver que hace el primer for:

```js
for (var i = 0; i < arguments.length; i++) {
        /*for (var j = 0; j < arguments[i].length; j++) {
            newObj[p] = arguments[i][j]
            p++
        }*/
    }
```

Este primer for va a recorrer todos los objetos iterables que le hayamos enviado a la función; es decir, si nosotros llamamos a esta función de esta manera: concat(iterable1, iterable2), va a recorrer los objetos iterable1 y iterable2, y para eso utilizamos el arguments.length. Si llamasemos a esta función así: concat(iterable1, iterable2, iterable3, iterable4, iterable5), tambíen recorreriamos todos los objetos, gracias a que la condición de continuidad del for es que la "i" declarada en el for sea más pequeña la length de todos los argumentos introducidos al llamar a la función.

Pasamos al for anidado en el primer for:

```js
//for (var i = 0; i < arguments.length; i++) {
        for (var j = 0; j < arguments[i].length; j++) {
            newObj[p] = arguments[i][j]
            p++
        }
    //}
```

En este segundo for vamos a recorrer las propiedades del objeto que hemos seleccionado con el for anterior. Para hacer esto inicializamos una nueva variable, "j", y la condición de continuidad del for es que "j" sea menor que la length del objeto que estamos recorriendo con "i", y luego incrementamos j ( j++) en cada iteración. 

Dentro del for le asignamos a nuestro nuevo objeto la propiedad del objeto que estamos recorriendo. Para hacer esto utilizamos la p que hemos creado previamente fuera de los bucles for; esta p la utilizo porque no se ni cuantos objetos va a introducir el usuario en la función ni cuantas propiedades va a tener cada uno de estos objetos, y utilizando la "p" consigo tener una variable externa a "i" y a "j" que siempre vaya aumentando (p++) para poder asignar todas las propiedades a nuestro nuevo objeto sin problema alguno. Así pues, newObj[ p ] igualara a arguments[ i ][ j ], donde la "i" señala qué objeto de los que hemos enviado a la función concat estamos mirando, y "j" señala a las propiedades del objeto que estamos mirando con "i".

Y por último, después de los bucles for:

```js
// var concat = function (iterables) {
//     var newObj = new Object
//     var p = 0; //para asignar las propiedades del nuevo objeto
//     for (var i = 0; i < arguments.length; i++) {
//         for (var j = 0; j < arguments[i].length; j++) {
//             newObj[p] = arguments[i][j]
//             p++
//         }
//     }
    newObj.length = p
    return newObj
//}
```

Le asignamos la length a newObj utilizando la "p" que hemos utilizado para asignarle a newObj las propiedades de los iterables, ya que esta siempre va a acabar siendo el número de propiedades de nuestro nuevo objeto.

Y finalmente retornamos el nuevo objeto q hemos creado que ha concatenado todos los iterables enviados a la función.

(Quizás la "p" no he sabido explicarla del todo, pero básicamente es una manera algo chapuzera y cómoda de inyectarle al nuevo objeto las propiedades de los objetos enviados a la función y de la length.)

## function-indexOf

```js
var indexOf = function (iterable, element, index) {
    if (!index) {
        index = 0;
    }
    else if (index < 0) {
        index = iterable.length + index
    }
    for (index; index < iterable.length; index++) {
        if (iterable[index] === element) {
            return index
        }
    }
    return -1
}
```
(En esta función no he aplicado ni "arguments" ni ternarios, he querido hacer indexOf de esta manera para poder compararla más tarde con la función lastIndexOf, donde sí he utilizado "arguments" y ternarios.)

La función indexOf sirve para encontrar en qué indice se encuentra cierto elemento dentro de un iterable, y con la posibilidad de enviarle un indice al llamar a la función para que esta empiece a buscar desde esa posición.

Esta función acepta 3 elementos: el iterable, el elemento a buscar, y el indice desde el cual el usuario quiere que empecemos a buscar (este último es opcional).

Empecemos con el primer if:

```js
if (!index) {
        index = 0;
    }
```

En este if lo único que observamos es si el usuario ha introducido un indice al llamar la función, y en caso de que no se haya introducido ningún indice, le decimos que se iguala a 0.

Seguimos con el else if:

```js
else if (index < 0) {
        index = iterable.length + index
    }
```

En este else if entramos únicamente si el usuario SI ha introducido un indice al llamar la función, y lo que hace es, en caso de que dicho indice sea negativo, sumarle la length del iterable, para empezar a contar desde atrás de la función (algo similar hemos visto en la función at).

Pasemos al for:

```js
for (index; index < iterable.length; index++) {
    if (iterable[index] === element) {
        return index
    }
}
```

En este for, en vez de declarar una "var i = 0" como se hace normalmente, utilizaremos el indice para recorrer el iterable. La condición de continuidad será que el index sea más pequeño que la length del iterable (lo que hacemos casi siempre pero en vez de con la "i" con el "index").

Una vez entramos al for nos encontramos con un if, y este if lo que hace es observar si la propiedad que estamos recorriendo del iterabl es igual al "element" que ha introducido el usuario al llamar a la función (el elemento que estamos buscando en el iterable), y en caso de que sea cierto, entraremos al if y devolveremos el indice en el cual se encuentra dicho elemento; en el caso contrario no entraremos al if y continuaremos con el for, es decir seguiremos buscando el elemento.

Finalmente, tenemos otro return por si en el for no se ha encontrado a "element":

```js
// var indexOf = function (iterable, element, index) {
//     if (!index) {
//         index = 0;
//     }
//     else if (index < 0) {
//         index = iterable.length + index
//     }
//     for (index; index < iterable.length; index++) {
//         if (iterable[index] === element) {
//             return index
//         }
//     }
    return -1
//}
```

A este return solo llegaremos o bien si el indice introducido por el usuario es mayor a la length del iterable o si no se ha podido encontrar el elemento introducido por el usuario.

Note: si introducimos un -1000 (o cualquier número negativo que sobrepase la longitud del iterable en negativo (-iterable.length), sí que recorrerá el array; en mi opinión no debería pero MDN dice que si, así que a apechugar.)

***Negative index counts back from the end of the array — if -array.length <= fromIndex < 0, fromIndex + array.length is used. Note, the array is still searched from front to back in this case.***

## function-join

```js
var join = function (iterable, separator) {
    var outcome = '';
    for (var i = 0; i < iterable.length; i++) {
        i == iterable.length - 1 ? outcome = outcome + iterable[i]
            : outcome = outcome + iterable[i] + (arguments.length !== 2 ? ',' : separator)
    }
    return outcome
}
```

La función join sirve para crear un string concatenando todos los elementos del iterable, añadiendo un separador de por medio. Esta función acepta un iterable y un separador para los elementos, aunque este separador es opcional.

Vamos a ver la primera linea de dentro de la función: 

```js
var outcome = '';
```

En esta primera linea simplemente creamos un string vacío, pero no indefinido, donde almacenaremos el string que queremos que devuelva nuestra función.

Pasemos a ver el bucle for:

```js
for (var i = 0; i < iterable.length; i++) {
        i == iterable.length - 1 ? outcome = outcome + iterable[i]
            : outcome = outcome + iterable[i] + (arguments.length !== 2 ? ',' : separator)
    }
```

En este for declaramos la var i = 0, y la condición de continuidad es que i < iterable.length, como solemos hacer en estos bucles. 

Entramos al for: 

```js
i == iterable.length - 1 ? outcome = outcome + iterable[i]
: outcome = outcome + iterable[i] + (arguments.length !== 2 ? ',' : separator)
```

Dentro de este for tenemos un ternario con un ternario dentro (sí, es un poco confuso).

 Empecemos por el primer fragmento del ternario:

 ```js
 i == iterable.length - 1 ? outcome = outcome + iterable[i]
: outcome = outcome + iterable[i] + //(arguments.length !== 2 ? ',' : separator)
 ```

 En esta primera parte lo que queremos determinar es si la posición que estamos recorriendo dentro de nuestro array es la última o no, ya que nosotros solo queremos introducir el separador entre los elementos, y no al final; es decir, queremos que el output sea:

 ```js
    Air-Fire-Water-Earth
 ```
 
 y no

 ```js
    Air-Fire-Water-Earth-
 ```

 Por lo tanto, este ternario lo que hace es, en caso de detectar que ya estamos en la última posición del iterable, concatena a nuestro string "outcome" el elemento en el que nos encontramos y ya está, pero en caso de que aun no nos encontremos en la última posición del iterable, también añade el separador, que es la parte del segundo ternario y que vamos a mirar ahora mismo:

 ```js
 /*i == iterable.length - 1 ? outcome = outcome + iterable[i]
: outcome = outcome + iterable[i] + */(arguments.length !== 2 ? ',' : separator)
 ```

 En este segundo ternario, al cual llegamos solo en caso de no estar ya en la posición final de nuestro iterable, comprovamos si el usuario ha introducio un separador a la hora de llamar a la función; en caso de que los "arguments" enviados al llamar a la función sea diferente a 2, es decir, que no haya un separador enviado, crearemos el separador por defecto ",", pero en caso de que "arguments" sí tenga una length de 2, utilizaremos el separador introducido por el usuario al llamar la función.

 Y finalmente:

 ```js
//  var join = function (iterable, separator) {
//     var outcome = '';
//     for (var i = 0; i < iterable.length; i++) {
//         i == iterable.length - 1 ? outcome = outcome + iterable[i]
//             : outcome = outcome + iterable[i] + (arguments.length !== 2 ? ',' : separator)
//     }
    return outcome
//}
 ```

 Retornamos el string outcome con los elementos del iterable separados o bien por el separador introducido por el usuario o bien por el separador por defecto.

 ## function-lastIndexOf

 ```js
 var lastIndexOf = function (iterable, element, index) {
    for (var i = (arguments.length === 2 || index >= iterable.length ? iterable.length - 1 :
        -iterable.length <= index && index < 0 ? index + iterable.length :
            index);
        i >= 0;
        i--) {
        if (iterable[i] === element) {
            return i
        }
    }
    return - 1
}
 ```

 Bueno. Ternario.

 Antes de nada, lastIndexOf es una función similar a indexOf, pero en este caso buscamos la última posición en la que se encuentra un elemento dentro del iterable, no la primera que nos encontremos, por lo tanto esta función es como la de indexOf pero empezando a buscar desde el final del iterable. Esta función acepta los argumentos del iterable a recorrer, el elemento a encontrar y el indice desde el cual queremos empezar a buscar nuestro elemento (este último argumento es opcional)

 Empecemos con la chicha de la función, el bucle for con el ternario diabólico:

 ```js
 for (var i = (arguments.length === 2 || index >= iterable.length ? iterable.length - 1 :
        -iterable.length <= index && index < 0 ? index + iterable.length :
            index);
        i >= 0;
        i--) {
        if (iterable[i] === element) {
            return i
        }
    }
 ```

 Si nos fijamos bien, todo este ternario está introducido en la declaración de variable dentro del for, es decir, el ternario únicamente afecta al valor que le daremos a "i".

 ```js
 var i = (arguments.length === 2 || index >= iterable.length ? iterable.length - 1 :
        -iterable.length <= index && index < 0 ? index + iterable.length :
            index)
 ```

 Este ternario está formulado como un if, else if, else, así que veamoslo por partes:

 ```js
 arguments.length === 2 || index >= iterable.length ? iterable.length - 1 :
 ```

La primera condición evalúa si la length de los argumentos es exactamente 2 y si el index introducido por el usuario es mayor a la length de nuestro iterable, y en caso de que cualquiera de estas dos condiciones sea cierta, el valor de indice sera "iterable.length - 1".

Si ninguna de las dos primeras condiciones se cumple, pasamos a la segunda condición:

```js
-iterable.length <= index && index < 0 ? index + iterable.length :
```

En esta segunda condición, si la longitud en negativo del iterable es menor o igual al indice y si el indice es menor que 0, el valor resultante de index será "index + iterable.length". Esta parte del ternario es para ajustar el indice en caso de que sea negativo.

Y por último el "else" del ternario, el valor por defecto:

```js
index
```

En este caso por defecto, utilizaremos el indice introducido por el usuario y punto.

Siguiendo con el bucle for, la condición de continuidad es que i sea mayor o igual a 0; recordemos que lastIndexOf busca desde atrás hacia delante.

Una vez entramos al for:

```js
if (iterable[i] === element) {
            return i
        }
```

Tenemos un if que en caso de que se encuentre el elemento introducido por el usuario, la función devuelva el indice en el que se encuentra.

Finalmente, tenemos otro return por si no se encuentra el elemento introducido o este se sale del rango de la longitud de nuestro iterable.

```js
//  var lastIndexOf = function (iterable, element, index) {
//     for (var i = (arguments.length === 2 || index >= iterable.length ? iterable.length - 1 :
//         -iterable.length <= index && index < 0 ? index + iterable.length :
//             index);
//         i >= 0;
//         i--) {
//         if (iterable[i] === element) {
//             return i
//         }
//     }
    return - 1
//}
```

Note: si introducimos un valor mayor que la longitud de nuestro iterable la función no devolverá -1, sino que seguira funcionando. Lo mismo que pasa en la función indexOf pero en vez de con números fuera del rango negativo, con números fuera del rango positivo.

***You can think of it conceptually as starting at a nonexistent position beyond the end of the array and going backwards from there.***

Note2: Esta función hecha sin ternarios seria mucho más fácil de entender seguramente, ya que aunque es muy similar a la función indexOf, al hacerla de esta manera es (o se me hace) mucho más difícil tanto de entender como de explicar, por eso la función la he hecho sin utilizar ternarios ni arguments, para ver que simplificar una función aunque reduce lineas de código, no necesariamente es algo positivo.

## function-pop

```js
var pop = function (iterable) {
    var deleted = iterable[iterable.length - 1]
    delete iterable[iterable.length - 1]
    if (iterable.hasOwnProperty('length')) {
        iterable.length--
    } else return 'empty iterable detected'
    return deleted
}
```

La función pop lo que hace es eliminar el último elemento del iterable que le hayamos enviado. Esta función solo acepta como argumento el iterable del cual queremos eliminar la última posición.

Empecemos a diseccionar la función:

```js
var deleted = iterable[iterable.length - 1]
delete iterable[iterable.length - 1]
```

En estas dos primeras lineas lo que hacemos es almacenar el elemento que vamos a borrar (linea 1) y luego borrarlo (linea 2).

Vamos a ver el if, else:

```js
if (iterable.hasOwnProperty('length')) {
        iterable.length--
    } else return 'empty iterable detected'
```

Este if else lo utilizamos para ver si el iterable que le hemos enviado tiene la propiedad "length". Qué quiere decir esto? Estamos comprobando que el iterable tiene una longitud, por lo tanto, estamos comprobando que el iterable no está vacío.

En caso de que esté vacío, devolvemos el string "empty iterable detected"

Finalmente el return:

```js
// var pop = function (iterable) {
//     var deleted = iterable[iterable.length - 1]
//     delete iterable[iterable.length - 1]
//     if (iterable.hasOwnProperty('length')) {
//         iterable.length--
//     } else return 'empty iterable detected'
    return deleted
//}
```

En este return devolvemos el valor eliminado previamente (en caso de que se envie un iterable vacío, no llegamos a este return sino que devolvemos el string que nos dice que está vacío).

## function-push

```js
var push = function (iterable, element) {
    if (arguments === 2) {
        iterable[iterable.length] = element
        iterable.length++
        return iterable.length
    }
    else {
        for (var i = 1; i < arguments.length; i++) {
            iterable[iterable.length] = arguments[i]
            iterable.length++
        }
        return iterable.length
    }
}
```

La función push sirve para añadir uno o varios elementos al final de nuestro iterable. En este caso la función siempre recibirá un mínimo de 2 argumentos: el iterable al que le queremos añadir 1 o varios elementos y el elemento (mínimo necesitamos enviarle 1 elemento).

Veamos el primer if:

```js
if (arguments === 2) {
        iterable[iterable.length] = element
        iterable.length++
        return iterable.length
    }
```

Aquí estamos diciendo que, en caso de que nuestra función haya recibido solo dos argumentos (el iterable y un elemento a añadir), añadimos el elemento al final del iterable y le subimos en 1 la length del iterable. Acto seguido devolvemos la longitud del iterable modificado.

Vamos a ver el else:

```js
else {
        for (var i = 1; i < arguments.length; i++) {
            iterable[iterable.length] = arguments[i]
            iterable.length++
        }
        return iterable.length
    }
```

En este else entraremos solo cuando se le envie a la función el iterable y 2 o más elementos para añadir.

Vamos a ver el bucle for de cerca:

```js
for (var i = 1; i < arguments.length; i++) {
            iterable[iterable.length] = arguments[i]
            iterable.length++
        }
```

Declaramos la var i = 1, ya que lo que queremos recorrer son los argumentos enviados después del primer argumento, que es "iterable". La condición de continuidad es que "i" sea menor a la length de los argumentos enviados posteriores al argumento de iterable (es decir, los elementos que queremos añadirle al iterable).

Una vez entramos al for, le añadimos a la nueva posición del iterable (utilizamos la length del iterable para crear la nueva posición) igualandola a la posición de los arguments(el elemento a añadir), y luego sumamos en 1 la length del iterable.

## function-reverse

```js
var reverse = function (iterable) {
    var reversedObject = new Object
    var p = 0; //para asignarle las propiedades al nuevo objeto
    for (var i = iterable.length - 1; i >= 0; i--) {
        reversedObject[p] = iterable[i]
        p++
    }
    reversedObject.length = iterable.length
    for (var i = 0; i < reversedObject.length; i++) {
        iterable[i] = reversedObject[i]
    }
    return iterable
}
```

La función reverse lo que hace es darle la vuelta a un iterable, colocando lo que era el elemento de la última posición en la primera, el penúltimo en la segunda, etc...

Veamos la función paso a paso:

```js
var reversedObject = new Object
var p = 0; //para asignarle las propiedades al nuevo objeto
```

Lo primero de todo creamos un nuevo objeto, ahora en el siguiente for veremos para qué lo queremos, y en la segunda linea creamos una var "p" que funcionará exactamente igual a la "p" creada en la función concat, para poder manejar en que posición estamos introduciendo las nuevas propiedades a nuestro antojo.

Vayamos al primer for:

```js
for (var i = iterable.length - 1; i >= 0; i--) {
        reversedObject[p] = iterable[i]
        p++
    }
```

En este primer for le damos a "i" el valor de la length del iterable, y la condición de continuidad es que "i" sea mayor o igual que 0, ya que vamos a recorrer este iterable de atrás hacia adelante. Cabe destacar que en este for, a cada iteración que hagamos le restaremos 1 a i (i--), en vez de sumarle 1 como hacemos normalmente.

Lo que hace este for es clonar el iterable enviado a la función a nuestro nuevo objeto "reversedObject", pero como estamos recorriendo el iterable de atrás hacia adelante, lo que estamos haciendo es clonarlo del revés, es decir, la primera posición de "reversedObject" será igual a la última posición de "iterable", y asi todo el rato hasta que lo tengamos clonado del todo.

Antes del segundo for:

```js
reversedObject.length = iterable.length
```

Le asignamos a nuestro nuevo objeto que ya tiene almacenado el "iterable" revertido la misma longitud que tiene el iterable, ya que esta no cambia.

El segundo for:

```js
for (var i = 0; i < reversedObject.length; i++) {
        iterable[i] = reversedObject[i]
    }
```

En este segundo for hacemos que el iterable (sí, el iterable que ha entrado a la función como argumento), se copie o clone al "reversedObject" que hemos creado (que es el iterable ya dado la vuelta). Por qué hacemos esto si ya tenemos el iterable revertido almacenado en "reversedObject"? Para qué iba a modificar también "iterable"? Pues porque el método reverse(), en los arrays, no genera una copia del array dada la vuelta, sino que modifica el array original completamente, por lo tanto lo que estamos haciendo aquí es hacer que el objeto original copie a "reversedObject", el objeto revertido, para que este también lo esté.

En resumen, reversedObject solo nos sirve para darle la vuelta inicialmente al iterable, y que así luego sea más facil de copiar.

Para acabar de ver por qué reversedObject nace y muere dentro de la función, tenemos el return final:

```js
// var reverse = function (iterable) {
//     var reversedObject = new Object
//     var p = 0; //para asignarle las propiedades al nuevo objeto
//     for (var i = iterable.length - 1; i >= 0; i--) {
//         reversedObject[p] = iterable[i]
//         p++
//     }
//     reversedObject.length = iterable.length
//     for (var i = 0; i < reversedObject.length; i++) {
//         iterable[i] = reversedObject[i]
//     }
    return iterable
//}
```

Nosotros lo que retornamos es el mismo iterable que nos habia llegado por argumentos, pero ya modificado. reversedObject nos facilita el trabajo a la hora de darle la vuelta, pero no es lo que retornamos, ya que lo que queremos es modificar el iterable original, y no crear una copia de seguridad, por decirlo de alguna manera.

## function-shift

```js
var shift = function (iterable) {
    var firstElement = iterable[0]
    delete iterable[0]
    for (var i = 1; i < iterable.length; i++) {
        iterable[i - 1] = iterable[i]
    }
    iterable.length--
    delete iterable[iterable.length] //borrar la posición que nos sobra por la cola del iterable
    return firstElement
}
```

La función shift lo que hace es eliminar el primer elemento del iterable. Solo acepta dicho iterable como argumento.

Empecemos a ver la función de cerca:

```js
var firstElement = iterable[0]
delete iterable[0]
```

Lo primero que hacemos es almacenar el primer valor (el que vamos a eliminar) en una variable, en este caso llamada "firstElement", y en segundo lugar, una vez ya esta almacenada, la eliminamos del iterable.

Vayamos al for:

```js
for (var i = 1; i < iterable.length; i++) {
        iterable[i - 1] = iterable[i]
    }
```

Este for empieza declarando la var i = 1, ya que anteriormente hemos eliminado la posición 0, por lo tanto no tendria sentido empezar por ahí (al menos no tal y como he planteado yo este problema, seguramente se pueda de todas maneras pero whatever)

Pasemos a ver la linea del for:

```js
iterable[i - 1] = iterable[i]
```

Aquí lo que le estamos diciendo, es que queremos que la posición anterior a la que nos encontramos copie el valor que hay en la posición en la que nos encontramos. Es decir, en la primera iteración, como empezamos en la posición 1, lo que le estariemos diciendo es que:

```js
iterable[1 - 1] = iterable[1]
// o de otra manera
iterable[0] = iterable[1]
```

Por qué estamos haciendo esto? Porque al haber borrado la posición 0, nuestro iterable no se ajusta a una nueva length ni nuevas posiciones, recordemos que eso pasa solo en arrays, no en objetos "normales" como con los que estamos tratando, por lo que sí, hemos borrado la posición 0, pero el resto de indices no han cambiado, ni la longgitud tampoco; entonces lo que estamos haciendo dentro de este for es, dicho de alguna manera, empujar todos nuestros indices uno hacia la izquierda, ya que queremos ajustarlo una vez borrada la posición 0.

Siguientes pasos de la función, al salir del for y haber movido todo 1 posición hacia la izquierda:

```js
iterable.length--
delete iterable[iterable.length] //borrar la posición que nos sobra por la cola del iterable
return firstElement
```

En primer lugar reducimos en 1 la length, ya que hemos borrado una de las posiciones (recordemos que en un objeto iterable, que no un array, la length la manipulamos nosotros, ya que no es una propiedad inmutable del objeto). Acto seguido, eliminamos la última posición que tenemos actualmente en el iterable. Por qué hacemos esto? Porque en el for lo que hemos hecho es "mover" todo una posición hacia la izquierda, pero realmente no lo hemos "movido" como tal, sino que hemos estado copiando valores, lo cual quiere decir que la última posición del iterable sigue existiendo cuando ya no deberia (porque al principio de todo hemos eliminado la posición 0). Finalmente, retornamos "firstElement", el elemento que estaba en la posición 0 y que borramos al principio de la función.

## function-unshift

```js
var unshift = function (iterable) {
    for (var i = arguments.length - 2; i >= 0; i--) {
        for (var j = iterable.length; j >= 0; j--) {
            iterable[j] = iterable[j - 1]
        }
        iterable[0] = arguments[i + 1]
        iterable.length++
    }
    return iterable
}
```

A ver. Este es jodido.

Después de escribir la explicación, ni yo mismo la he entendido del todo, recomiendo copiar el codigo de la función y debuggar para ver que está pasando exactamente, sobretodo en el primer for.

La función unshift lo que hace es: recibir un iterable y "n" elementos para añadirlos a dicho iterable. Es decir, esta función siempre recibirá un iterable y un número indefinido de elementos.

Como siempre, paso a paso: vayamos a ver el for:

```js
for (var i = arguments.length - 2; i >= 0; i--) {
        // for (var j = iterable.length; j >= 0; j--) {
        //     iterable[j] = iterable[j - 1]
        // }
        // iterable[0] = arguments[i + 1]
        // iterable.length++
    }
```

Ughh. No se si se explicar esto. Veamos..

En primer lugar declaramos la variable "i". Bien. A la variable "i" le damos el valor de arguments.length - 2. Sip. arguments.length - 2. Por qué? Hm. Esta función siempre recibirá un iterable, y después de este iterable n elementos para añadirle al iterable. A "i" le damos el valor de arguments.length - 2 porque: aunque de normal le dariamos arguments.length - 1 (ya que si entendemos los argumentos que recibe la función como un array, querríamos que observase arguments.length - 1, para ver todas las posiciones del array), pero en este caso le damos un -2, porque una posición de los arguments la ocupa el iterable, el cual no queremos considerar como un elemento.

Sigamos con el for anidado:

```js
// for (var i = arguments.length - 2; i >= 0; i--) {
        for (var j = iterable.length; j >= 0; j--) {
            iterable[j] = iterable[j - 1]
        }
    //     iterable[0] = arguments[i + 1]
    //     iterable.length++
    // }
```

En este for declaramos la variable "j" y le damos el valor de la length de iterable, la condición de continuidad del bucle es que j sea mayor o igual a 0, y en cada iteración restamos 1 a "j". Lo que queremos hacer con este for es desplazar los indices de nuestro iterable una posición hacia la derecha, es decir, mover (copiar) todo una posición para luego poder insertar un nuevo elemento en la posición 0. Por eso "j = iterable.length", y no "j = iterable.length - 1", porque lo que hacemos es recorrer el iterable desde atrás hacia adelante, y empezamos este proceso generando una nueva posición al final del iterable.

Volvemos al primer for:

```js
for (var i = arguments.length - 2; i >= 0; i--) {
        // for (var j = iterable.length; j >= 0; j--) {
        //     iterable[j] = iterable[j - 1]
        // }
        iterable[0] = arguments[i + 1]
        iterable.length++
    }
```

Después de salir del 2o for, ponemos en la posición 0 el elemento que se encuentre en la posición "arguments[i + 1]". Por qué "i + 1"? Porque recordemos que el primer argumento siempre será el iterable a modificar, de esta manera, y junto al valor de "i", nos saltamos el primer argumento de la función, que siempre será "iterable".

Y finalmente, el return:
```js
// var unshift = function (iterable) {
//     for (var i = arguments.length - 2; i >= 0; i--) {
//         for (var j = iterable.length; j >= 0; j--) {
//             iterable[j] = iterable[j - 1]
//         }
//         iterable[0] = arguments[i + 1]
//         iterable.length++
//     }
    return iterable
// }
```

Retornamos el iterable que hemos estado modificando.