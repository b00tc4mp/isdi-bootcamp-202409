# Iterables
En este README.md hablaré de los archvios que tengan un 1 en el nombre, por ejemplo: "at1.js", no "at.js", "concat1.js", no "concat.js", etc..., en el caso de que existan (refiriendome a las funciones que he hecho y estan en mi github)

Aviso: en algun apartado hay referencias a otros apartados, por lo que quizás hay alguna parte que no esta explicada al 100% porque está explicada en ese otro apartado.

## Index

### [Week 2](#week2)
#### Funciones 'solitarias'
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
### [Week 3](#week3)
#### Funciones 'solitarias'
- function [includes](#function-includes)
- function [fill](#function-fill)
- function [slice](#function-slice)
- function [copyWithin](#function-copyWithin)
- function [splice](#function-splice)
#### Raid
- Qué es un [Raid](#Raids) y para qué lo utilizamos
#### Funciones 'solitarias' con callbacks
- function [forEach](#function-forEach)
- function [map](#function-map)
- function [find](#function-find)
- function [findIndex](#function-findIndex)
- function [filter](#function-filter)
- function [reduce](#function-reduce)


## Week2

## Funciones solitarias

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

## Week3

## Funciones solitarias

## function-includes

```js
var includes = function (iterable, searchElement, fromIndex) {
    if (fromIndex < -iterable.length || fromIndex >= iterable.length) {
        return false
    }

    if (!fromIndex) {
        fromIndex = 0;
    }
    else if (fromIndex < 0) {
        fromIndex = iterable.length + fromIndex
    }
    for (fromIndex; fromIndex < iterable.length; fromIndex++) {
        if (iterable[fromIndex] === searchElement) {
            return true
        }
    }
    return false
}
```

La función includes es similar a la función indexOf, pero en vez de devolver el indice en el que se encuentra el elemento que estamos buscando, devuelve un booleano true o false, que se refiere a si el elemento está dentro del iterable o no, respectivamente.

Veamos los condicionales previos al bucle for: 
```js
if (fromIndex < -iterable.length || fromIndex >= iterable.length) {
        return false
    }

    if (!fromIndex) {
        fromIndex = 0;
    }
    else if (fromIndex < 0) {
        fromIndex = iterable.length + fromIndex
    }
```

En esta parte revisamos si los argumentos introducidos por el usuario 'tienen sentido'; en el primer if miramos que el fromIndex esté dentro del rango de la length de nuestro iterable, es decir, que sea una posición que seamos capaces de seleccionar.

En el segundo if, decimos que si no hay un fromIndex introducido por el usuario, nosotros mismos le asignamos un 0 para que recorra el iterable entero.

En caso de que sí haya un fromIndex y no hayamos entrado en el if anterior, tenemos un if else para que, en caso de que fromIndex sea un numero negativo, transformarlo a positivo con el "iterable.length + fromIndex", así de esta manera contamos desde el final del iterable.

Veamos el for:

```js
for (fromIndex; fromIndex < iterable.length; fromIndex++) {
        if (iterable[fromIndex] === searchElement) {
            return true
        }
    }
```

En primer lugar, como previamente hemos estudiado todoslos casos de fromIndex, podemos utilizarlo como variable para recorrer el iterable, y la condición de continuidad es que fromIndex sea meno que la longitud de nuestro iterable.

Dentro del for tenemos un condicional, que dice que en caso de que encontremos el elemento introducido por el usaurio mientras recorremos el iterable, finalizamos la función devolviendo true.

Veamos el final de la función:
```js
// var includes = function (iterable, searchElement, fromIndex) {
//     if (fromIndex < -iterable.length || fromIndex >= iterable.length) {
//         return false
//     }

//     if (!fromIndex) {
//         fromIndex = 0;
//     }
//     else if (fromIndex < 0) {
//         fromIndex = iterable.length + fromIndex
//     }
//     for (fromIndex; fromIndex < iterable.length; fromIndex++) {
//         if (iterable[fromIndex] === searchElement) {
//             return true
//         }
//     }
    return false
//}
```

Finalmente, si después de recorrer el iterable con el for no hemos encontrado el elemento introducido por el usuario, devolveremos "false", señalando que el elemento no se encuentra en el iterable.

## function-fill

```js
var fill = function (iterable, element, fromIndex, endIndex) {
    if (fromIndex < 0) {
        fromIndex += iterable.length // fromIndex = fromIndex + iterable.length
    }
    if (endIndex < 0) {
        endIndex += iterable.length
    }

    if (fromIndex >= iterable.length) {
        return iterable
    }
    if (endIndex <= fromIndex) {
        return iterable
    }

    for (var i = !fromIndex ? 0 : fromIndex;
        i < (!endIndex || endIndex >= iterable.length ? iterable.length : endIndex);
        i++) {
        iterable[i] = element
    }
    return iterable
}
```

La función fill rellena el iterable x veces con el elemento que hayamos enviado por parámetro al llamar a la función. Es indispensable enviar tanto el iterable a recorrer y el elemento con el que queremos rellenar el iterable, pero fromIndex y endIndex son opcionales.

Veamos los condicionales previos al for:
```js
if (fromIndex < 0) {
        fromIndex += iterable.length // fromIndex = fromIndex + iterable.length
    }
    if (endIndex < 0) {
        endIndex += iterable.length
    }

    if (fromIndex >= iterable.length) {
        return iterable
    }
    if (endIndex <= fromIndex) {
        return iterable
    }
```

Lo primero de todo, con los dos primeros if's miramos si el fromIndex y el endIndex introducidos por el usuario son negativos, y en caso de serlos los pasamos a positivos con la formula de siempre: fromIndex = fromIndex + iterable.length.

En los dos siguientes if's, por partes: en el primero, miramos que fromIndex sea mayor o igual que la longitud de nuestro iterable, y en caso de serlo, como no hay un indice que podamos seleccionar, devolvemos directamente el iterable. Lo mismo en caso de que el endIndex sea menor o igual que fromIndex, ya que no tendria sentido que la posición final sea menor o igual que la posición inicial, ya que queremos recorrer el iterable de izquierda a derecha.

Vayamos al for:

```js
for (var i = !fromIndex ? 0 : fromIndex;
        i < (!endIndex || endIndex >= iterable.length ? iterable.length : endIndex);
        i++) {
        iterable[i] = element
    }
```

Aquí he puesto un par de ternarios para acabar de cubrir todos los casos de uso. Empecemos por la declaración de "i":

```js
!fromIndex || fromIndex < -iterable.length ? 0 : fromIndex
```

Aquí le estamos diciendo que "i", en caso de que no hayamos introducido un fromIndex al llamar a la función, "i" será igual a 0, pero en caso de que sí haya sido introducido (y previamente haya pasado los condicionales, que funcionan como cortafuegos para asegurarse de que es un valor válido), "i" será igual a ese fromIndex.

En la condición de continuidad, tenemos otro ternario, que dice que: en caso de que no se haya introducido un endIndex o que el endIndex sea mayor a la longitud del iterable, la condición de continuidad será que i sea menor que la longitud del iterable, ya que no tendría sentido que le estemos diciendo al programa que la posición final es una que está mas allá de la longitud de nuestro iterable; y en caso de que esto no se cumpla, utilizaremos el endIndex introducido al llamar la función y que ha pasado el cortafuegos.

Como (casi) siempre, en cada iteración, hacemos i++.

Una vez dentro del for, igualamos cada posición que recorraos del iterable con el elemento que hemos introducido al llamar a la función.

```js
// var fill = function (iterable, element, fromIndex, endIndex) {
//     if (fromIndex < 0) {
//         fromIndex += iterable.length // fromIndex = fromIndex + iterable.length
//     }
//     if (endIndex < 0) {
//         endIndex += iterable.length
//     }

//     if (fromIndex >= iterable.length) {
//         return iterable
//     }
//     if (endIndex <= fromIndex) {
//         return iterable
//     }

//     for (var i = !fromIndex ? 0 : fromIndex;
//         i < (!endIndex || endIndex >= iterable.length ? iterable.length : endIndex);
//         i++) {
//         iterable[i] = element
//     }
    return iterable
//}
```

Finalmente retornamos el iterable que hemos modificado en el for.

## function-slice

```js
var slice = function (iterable, startIndex, endIndex) {
    if (arguments.length <= 1) { return iterable }

    var newObj = {}

    if (startIndex < 0) {
        startIndex = iterable.length + startIndex
    }
    if (startIndex >= iterable.length) {
        return newObj
    }

    if (endIndex < -iterable.length) {
        endIndex = iterable.length
    }
    else if (endIndex < 0) {
        endIndex = iterable.length + endIndex
    }

    if (endIndex <= startIndex) {
        return newObj
    }

    newObj.length = 0;
    for (var i = (!startIndex ? 0 : startIndex);
        i < (!endIndex ? iterable.length : endIndex);
        i++) {
        newObj[newObj.length] = iterable[i]
        newObj.length++
    }
    return newObj
}
```

La función slice devuelve una porción del iterable recortada, pero sin modificar el iterable original, es decir, nosotros le pasamos un startIndex (podria ser fromIndex) y un endIndex y crea una copia de los elementos entre startIndex y endIndex y la devuelve.

Veamos los típicos condicionales previos al for:

```js
if (arguments.length <= 1) { return iterable }

    var newObj = {}

    if (startIndex < 0) {
        startIndex = iterable.length + startIndex
    }
    if (startIndex >= iterable.length) {
        return newObj
    }

    if (endIndex < -iterable.length) {
        endIndex = iterable.length
    }
    else if (endIndex < 0) {
        endIndex = iterable.length + endIndex
    }

    if (endIndex <= startIndex) {
        return newObj
    }

    newObj.length = 0
```

En primer lugar, un if rapidín que dice que si no se ha introducido más de un argumento, es decir, no hemos siquiera introducido un startIndex, devolvemos el iterable tal cual.

Si hemos introducido un startIndex, avanzamos en el código y creamos un nuevo objeto, dónde almacenaremos la copia que haremos desde startIndex hasta endIndex.

Empiezan los condicionales: el primer if después de la declaración de objeto: primero 'transformamos' startIndex a positivo en caso de que sea negativo, como ya hemos hecho tantas otras veces, y después, en otro if, revisamos si startIndex es mayor o igual a la longitud del iterable, y en caso de que lo sea retornamos el objeto que hemos creado completamente vacío, ya que no podemos seleccionar una posición que está más allá de nuestro iterable, por lo tanto no podemos copiar nada.

Siguiente if: en el caso de que endIndex sea menor que la longitud del iterable en negativo, le damos el valor de la longitud del array como límite, ya que endIndex es lo que utilizaremos mas tarde como limitante para recorrer el iterable. En el else if valoramos si, aunque endIndex no sea menor que la longitud del iterable en negativo, este es menor que 0, es decir un número negativo que entra dentro del rango de la length de nuestro iterable, y lo transformamos a positivo.

En el último if, miramos si después de todos estas valoraciones y transformaciones, endIndex es menor o igual que startIndex, y en caso de que lo sea devolvemos el nuevo objeto, ya que no podriamos generar ningún tipo de copia.

Por último, si hemos superado todo este cortafuegos, le damos longitud 0 a nuestro nuevo objeto, ya que ahora toca recorrer el iterable y generar la copia.

Vayamos al for:
```js
for (var i = (!startIndex ? 0 : startIndex);
        i < (!endIndex ? iterable.length : endIndex);
        i++) {
        newObj[newObj.length] = iterable[i]
        newObj.length++
    }
```

Como hemos hecho todo ese estudio previo al for, éste no es muy extenso.

En primer lugar declaramos la "i": y le decimos que en caso de que no hayamos introducido un startIndex al llamar a la función, "i" será igual a 0, pero en caso contrario utilizaremos el startIndex.

Para la condición de continuidad hacemos algo muy similalr: si no hemos introducido un endIndex, la condición será que "i" sea menor que la longitud del iterable, pero en caso contrario utilizamos endIndex en vez de la longitud del iterable.

Como (casi) siempre (de nuevo) i++.

Y dentro del for ya hay poca cosa, como estamos recorriendo exactamente la parte del iterabe la cual queremos copiar, le vamos asignando al nuevo objeto la posición en la que nos encontramos del iterable, y vamos aumentando la longitud del nuevo objeto.

Finalmente:

```js
// var slice = function (iterable, startIndex, endIndex) {
//     if (arguments.length <= 1) { return iterable }

//     var newObj = {}

//     if (startIndex < 0) {
//         startIndex = iterable.length + startIndex
//     }
//     if (startIndex >= iterable.length) {
//         return newObj
//     }

//     if (endIndex < -iterable.length) {
//         endIndex = iterable.length
//     }
//     else if (endIndex < 0) {
//         endIndex = iterable.length + endIndex
//     }

//     if (endIndex <= startIndex) {
//         return newObj
//     }

//     newObj.length = 0;
//     for (var i = (!startIndex ? 0 : startIndex);
//         i < (!endIndex ? iterable.length : endIndex);
//         i++) {
//         newObj[newObj.length] = iterable[i]
//         newObj.length++
//     }
    return newObj
//}
```

Devolvemos el nuevo objeto que hemos creado, con la copia de la porción seleccionada del iterable hecha.

## function-copyWithin

```js
var copyWithin = function (iterable, target, start, end) {
    var shallowCopy = { length: 0 }
    if (target >= iterable.length || start >= iterable.length) {
        return iterable
    }

    var target = (-iterable.length <= target && target < 0) ? target = target + iterable.length :
        (target < -iterable.length) ? 0 :
            target

    var start = (-iterable.length <= start && start < 0) ? start = start + iterable.length :
        (start < -iterable.length) ? 0 :
            start

    var end = (-iterable.length <= end && end < 0) ? end = end + iterable.length :
        (end > iterable.length || !end) ? end = iterable.length :
            (end < -iterable.length) ? 0 :
                end

    if (end <= start) {
        return iterable
    }

    for (var i = start; i < end; i++) {
        shallowCopy[shallowCopy.length] = iterable[i]
        shallowCopy.length++
    }

    if (iterable.length < shallowCopy.length + target) {
        for (var i = 0; i < iterable.length - target; i++) {
            iterable[target + i] = shallowCopy[i]
        }
    } else {
        for (var i = 0; i < shallowCopy.length; i++) {
            iterable[target + i] = shallowCopy[i]
        }
    }
    return iterable
}
```

La función copyWithin genera copias de partes del iterable y las copia en otra parte del iterable (todos los parametros controlados por el usuario). Esta función acepta el iterable, el target, el start, y el end, pero este último es opcional. Rarete no? Es más fácil de ver que de explicar, vamos por partes:

```js
var shallowCopy = { length: 0 }
    if (target >= iterable.length || start >= iterable.length) {
        return iterable
    }
```

En la primera línea de la función, creamos un objeto llamado shallowCopy donde más tarde almacenaremos la parte del iterable que queremos  copiar.

Después tenemos el primer cortafuegos, que dice que en caso de que el target o el start (ambos parámetros obligatorios) sean mayores o iguales a la longitud del iterable, salimos de la función retornando el iterable sin cambiar nada, ya que no podemos copiar nada.

Vayamos con el ternario de target:

```js
var target = (-iterable.length <= target && target < 0) ? target = target + iterable.length :
        (target < -iterable.length) ? 0 :
            target
```

Este ternario determina el valor de target. Primera parte (if):

```js
var target = (-iterable.length <= target && target < 0) ? target = target + iterable.length :
//        (target < -iterable.length) ? 0 :
//           target
```

Aquí, aunque presentado de manera más larga, estamos revisando si el target es negativo y está dentro del rango de la longitud del iterable, tal y como hemos hecho ya varias veces en varias funciones.

En caso de que no sea así, segunda parte (else if):

```js
//var target = (-iterable.length <= target && target < 0) ? target = target + iterable.length :
        (target < -iterable.length) ? 0 :
            //target
```

Si el target introducido es menor que la longitud en negativo del iterable, es decir, si se sale del rango, target será igual a 0.

En el último caso (else):

```js
//var target = (-iterable.length <= target && target < 0) ? target = target + iterable.length :
//        (target < -iterable.length) ? 0 :
            target
```

Utilizaremos el valor de target que hayamos introducido al llamar a la función.

Ahora veremos que estos 3 ternarios (target, start, end) son bastante similares entre si mismos, aunque alguno valora alguna opción extra.

Ternario para determinar el valor de start:

```js
var start = (-iterable.length <= start && start < 0) ? start = start + iterable.length :
        (start < -iterable.length) ? 0 :
            start
```

Por partes:

```js
var start = (-iterable.length <= start && start < 0) ? start = start + iterable.length :
//        (start < -iterable.length) ? 0 :
//            start
```

Primera parte: exactamente igual que el target, si es negativo y dentro del rango del iterable, lo transformamos a positivo.

Next:
```js
//var start = (-iterable.length <= start && start < 0) ? start = start + iterable.length :
        (start < -iterable.length) ? 0 :
            //start
```

Si start es menor que el rango de la longitud en negativo: start será igual a 0.

Por último:
```js
//var start = (-iterable.length <= start && start < 0) ? start = start + iterable.length :
        //(start < -iterable.length) ? 0 :
            start
```

En caso de que nada de lo anterior se cumpla, utilizamos el start introducido por parámetro.

El último ternario, el de end:

```js
var end = (-iterable.length <= end && end < 0) ? end = end + iterable.length :
        (end > iterable.length || !end) ? end = iterable.length :
            (end < -iterable.length) ? 0 :
                end
```

Primer caso: as always: en negativo pero en rango válido: transformamos a positivo.
```js
var end = (-iterable.length <= end && end < 0) ? end = end + iterable.length :
//        (end > iterable.length || !end) ? end = iterable.length :
//            (end < -iterable.length) ? 0 :
//                end
```

Second case:

```js
//var end = (-iterable.length <= end && end < 0) ? end = end + iterable.length :
        (end > iterable.length || !end) ? end = iterable.length :
            //(end < -iterable.length) ? 0 :
                //end
```

En caso de que end sea mayor que la longitud del iterable o que no hayamos introducido un end, este será igual a la longitud del iterable.

Sigamos:

```js
//var end = (-iterable.length <= end && end < 0) ? end = end + iterable.length :
        //(end > iterable.length || !end) ? end = iterable.length :
            (end < -iterable.length) ? 0 :
                //end
```

Si end es menor que la longitud del iterable en negativo, esta será igual a 0 (caso de MDN).

Finalmente(else):

```js
//var end = (-iterable.length <= end && end < 0) ? end = end + iterable.length :
        //(end > iterable.length || !end) ? end = iterable.length :
            //(end < -iterable.length) ? 0 :
                end
```

Utilizamos el end introducido por parámetro.

Ahora, antes del primer for, tenemos un if:

```js
if (end <= start) {
        return iterable
    }
```

Aquí, después de todas las sumas, restas, consideraciones y demás, decimos que si end es menor o igual que start, devolvemos el iterable, ya que no podriamos hacer una copia.

Vayamos al primer for (por fin):

```js
for (var i = start; i < end; i++) {
        shallowCopy[shallowCopy.length] = iterable[i]
        shallowCopy.length++
    }
```

En este for, simplemente recorremos desde la posición inicial hasta la final señalizadas por los parámetros introducidos y que hemos calculado de camino, copiando en nuestro nuevo objeto la porción del iterable que hemos seleccionado.

Y ya casi al final de la función:

```js
if (iterable.length < shallowCopy.length + target) {
        for (var i = 0; i < iterable.length - target; i++) {
            iterable[target + i] = shallowCopy[i]
        }
    } else {
        for (var i = 0; i < shallowCopy.length; i++) {
            iterable[target + i] = shallowCopy[i]
        }
    }
```

De primeras tenemos un if, que dice que : en caso de que la longitud del iterable sea inferior a la suma de la longitud de la copia y el target, utilizaremos un for, y en caso contrario otro for.

Antes de pasar a los bucles, que dice exactamente ese if? La funcón copyWithin NO puede alterar la longitud del iterable, por lo que si nosotros al intentar insertar la copia en el iterable fuesemos a superar esa length, accedermos al for que gestiona ese caso:

```js
for (var i = 0; i < iterable.length - target; i++) {
            iterable[target + i] = shallowCopy[i]
        }
```

En este for declaramos que "i" es igual a 0, y la condición de continuidad es que "i" sea menor que la longitud del iterable menos el target, ya que nosotros empezaremos a colocar la copia a partir de ese target, y no queremos pasarnos de la longitud del iterable.

Dentro del for le decimos exactamente eso: en la posición del iterable de target + "i", es decir empezamos a copiar desde el target y aumentamos en 1 la posición en cada iteración.

El otro for:

```js
for (var i = 0; i < shallowCopy.length; i++) {
            iterable[target + i] = shallowCopy[i]
        }
```

En este otro, como ya hemos comprobado que no nos vamos a pasar de la longitud del iterable, la condición de continuidad es la longitud de la copia. El resto es igual al for de arriba.

Por último:

```js
// var copyWithin = function (iterable, target, start, end) {
//     var shallowCopy = { length: 0 }
//     if (target >= iterable.length || start >= iterable.length) {
//         return iterable
//     }

//     var target = (-iterable.length <= target && target < 0) ? target = target + iterable.length :
//         (target < -iterable.length) ? 0 :
//             target

//     var start = (-iterable.length <= start && start < 0) ? start = start + iterable.length :
//         (start < -iterable.length) ? 0 :
//             start

//     var end = (-iterable.length <= end && end < 0) ? end = end + iterable.length :
//         (end > iterable.length || !end) ? end = iterable.length :
//             (end < -iterable.length) ? 0 :
//                 end

//     if (end <= start) {
//         return iterable
//     }

//     for (var i = start; i < end; i++) {
//         shallowCopy[shallowCopy.length] = iterable[i]
//         shallowCopy.length++
//     }

//     if (iterable.length < shallowCopy.length + target) {
//         for (var i = 0; i < iterable.length - target; i++) {
//             iterable[target + i] = shallowCopy[i]
//         }
//     } else {
//         for (var i = 0; i < shallowCopy.length; i++) {
//             iterable[target + i] = shallowCopy[i]
//         }
//     }
    return iterable
//}
```

Devolvemos el iterable modificado.

## function-splice

No.

Nope.

Nanai.

Nein.

Sigamos

## Raids

Qué es un Raid? Para qué y por qué lo utilizamos?

Hmmmmmmmmm.

Let's go. (Con voz de mario)

Lo primero de todo, vamos a ver la función para instanciar los objetos Raid:

```js
var Raid = function () {
    this.length = 0
}
```

Para empezar, aclarar que "Raid" es un nombre que hemos escogido nosotros, no tiene ningún significado dentro de javascript como sí lo tienen los términos "Array" o "Object".

Bien, en estas líneas de código lo que estamos creando un constructor. Un constructor es un método especial que se utiliza para inicializar un objeto recién creado y asignarle valores iniciales a sus variables de instancia. Esto significa que, nosotros estamos creando un objeto, pero no un objeto cualquiera dado por javascript, sino un objeto tipo "Raid" que nos hemos inventado nosotros, y al que nosotros le daremos todas sus propiedades y valores. Y siempre que inicializamos un Raid, como estamos tratando con iterables todo el rato, le asociamos una longitud igual a 0, lo que quiere decir que siempre que inicializemos un objeto tal que así:

```js
var numbers = new Raid
```

Nuestro Raid, en este caso numbers, nada más "nazca" tendrá una length = 0.

Una vez tenemos el Raid creado, normalmente le insertamos algunas propiedades numéricas (no tienen por qué serlo, pero como estamos tratando con iterables siempre ponemos indices numéricos) lo hacemos tal que así:

```js
//var numbers = new Raid
numbers[0] = 100
numbers[1] = 100
numbers[2] = 100
numbers[3] = 100
```

Y después de esto le reasignamos la length:

```js
//var numbers = new Raid
// numbers[0] = 100
// numbers[1] = 100
// numbers[2] = 100
// numbers[3] = 100
numbers.length = 4
```

Bien, ahora tenemos un Raid almacenado en la variable numbers, con 4 posiciones y por ende una longitud de 4.

Hasta aquí lo que hemos hecho es solamente determinar que vamos a tener unos tipos de objeto llamados "Raid" y hemos creado un Raid asociándole unos valores y una longitud, vamos ahora a crear una función inherente para todos los Raid:

```js
Raid.prototype.pop = function () {

}
```

Con esto que hemos hecho? Hemos creado una función llamada pop que podran utilizar todos nuestros Raid. Para dejar clara la diferencia, cuando trabajamos con funciones solitarias, las declaramos así:

```js
var pop = function () {

}
```

Cual es la diferencia? En el segundo caso lo que estamos creando es una variable global que almacena una función, que podremos llamar siempre que queramos de la siguiente manera:

```js
pop()
```

Sin embargo, en el primer caso (el de Raid), para llamarla tendremos que hacer esto:

```js
// Raid.prototype.pop = function () {

// }

numbers.pop()
```

Por qué? Porque pop es una función asociada a los Raid, es decir, es un método de los objetos que hayamos inicializado como new Raid, no una función global y accesible de manera solitaria.

Si intentasemos llamar a la función pop sin asociarla a un objeto Raid, la consola nos dirá lo siguiente:

```js
pop()
  |
  |
  V
Uncaught ReferenceError: pop is not defined
```

Nos sale esto porque, tal y como hemos comentado, pop es un método de Raid, y para llamarlo y utilizarlo tenemos que hacerlo sobre un objeto Raid como "numbers", en este caso.

Sigamos con el método pop:

```js
Raid.prototype.pop = function () {
    var deleted = this[this.length - 1]
    delete this[this.length - 1]
    if (this.length > 0) {
        this.length--
    } else return 'empty Raid detected'
    return deleted
}

numbers.pop()
```

*Recordemos que la función pop borra el último elemento de una lista*

Vemos que dentro de la función ya no recibimos por parámetro un iterable, y donde antes poniamos "iterable" para referirnos a la lista que estabamos recorriendo, ahora ponemos "this".

Esto se debe a que ya no estamos llamando a una función solitaria la cual puede recibir cualquier iterable, sino que estamos llamando a un método de Raid, es decir, una función solo accesible para los iterables Raid que hemos creado, como en este caso numbers.

En el fondo estamos haciendo lo mismo dentro de la función, pero ya no nos referimos a la lista iterable como "iterable" ni entra como parámetro, sino que como la función pop es inherente de los Raid, cualquier Raid que creasemos seria capaz o "tendría el derecho" a acceder a esta función, por lo tanto utilizamos "this", para referirnos al Raid con el cual hemos llamado al método pop.

Para acabar, recalcar que todos los métodos son funciones, pero no todas las funciones son métodos. Un método solo es un método cuando "forma parte" de un tipo de objeto, en este caso Raid; al instanciar la función pop con "Raid.prototype" es cuando le decimos a todos nuestros Raid que podran utilizar y acceder al método pop.

## Funciones solitarias con "callbacks"

## function-forEach

```js
var result = 0

var forEach = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]
        callback(element)
    }
}
// Y la llamamos así:
forEach(nums, function (num) {
    result += num
})
```

La función forEach ejecutará la función indicada (callback) una vez por cada elemento que haya en el iterable.

Paso por paso, un callback es el uso de funciones como parámetros de otras funciones. Es decir, una función call back se crea cuando insertamos una función como valor de un parámetro de otra función.

Ahora veamos el código:

```js
// var result = 0
// var forEach = function (iterable, callback) {
//     for (var i = 0; i < iterable.length; i++) {
//         var element = iterable[i]
//         callback(element)
//     }
// }
// Y la llamamos así:
forEach(nums, function (num) {
    result += num
})
```

Empecemos mirando como llamamos a esta función. Estamos llamando a la función forEach con dos parámetros: nums (un iterable con números), y una función. De la misma manera que podemos llamar a una función enviándole como parámetros numbers, strings, etc etc..., también podemos hacerlo enviándole una función entera. El objetivo de esto es darle a la función forEach una función sobre la cual queremos iterar con los elementos de nuestro iterable.

Veamos la otra parte del código:

```js
// var result = 0

var forEach = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]
        callback(element)
    }
}
// Y la llamamos así:
// forEach(nums, function (num) {
//     result += num
// })
```

Lo primero, efectivamente nuestra función forEach recibe dos parámetros de entrada: el iterable y "callback" (la función a la que llamaremos desde forEach). Vayamos al for; primero declaramos una var "i" y le damos el valor 0, y la condición de continuidad es que "i" sea menor a la longitud del iterable, por lo tanto vamos a recorrer todo el iterable.

Vayamos a lo que pasa dentro del for:

```js
// var result = 0
// var forEach = function (iterable, callback) {
//     for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]
        callback(element)
//     }
// }
// Y la llamamos así:
// forEach(nums, function (num) {
//     result += num
// })
```

En la primera linea creamos una variable llamada element, y le damos el valor de la posición en la cual nos encontramos dentro del iterable.

Acto seguido, llamamos a la función que hemos enviado por parámetro. Lo que hace esta función es muy simple: tiene un parámetro de entrada, donde nosotros le enviaremos la posición del iterable en la que nos encontramos, y esta función sumará lo que le hemos enviado en la variable "result" que hemos declarado al principio del código.

De esta manera, por cada uno de los elementos que tenga el iterable, primero almacenaremos el valor de la posición en la que estamos y llamaremos a la función callback para que sume ese numero al resultado.

Destacar que esta función no tiene un return, sino que despues imprimiriamos con un console.log el resultado:

```js
console.log(result)
// la suma de todos los numeros del iterable
```

## function-map


```js
var map = function (iterable, callback) {
    var newObj = { length: 0 }
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]
        newObj[newObj.length] = callback(element)
        newObj.length++
    }
    return newObj
}
// Y la llamamos así:
var newNumbers = map(numbers, function (num) {
    return num * 2
})
```

La función map crea un nuevo iterable con los resultados de la función callback aplicada a cada uno de sus elementos.

Veamos primero como llamamos a la función map:

```js
// var map = function (iterable, callback) {
//     var newObj = { length: 0 }
//     for (var i = 0; i < iterable.length; i++) {
//         var element = iterable[i]
//         newObj[newObj.length] = callback(element)
//         newObj.length++
//     }
//     return newObj
// }
// Y la llamamos así:
var newNumbers = map(numbers, function (num) {
    return num * 2
})
```

Creamos una variable llamada newNumbers, donde almacenaremos el iterable que nos devolverá la función map, y le enviamos dos parámetros: numbers (un iterable con numeros) y una función que retorna el número que haya recibido multiplicado por dos. Para ver más claro como actúa esta función callback vayamos a la función principal:

```js
var map = function (iterable, callback) {
    var newObj = { length: 0 }
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]
        newObj[newObj.length] = callback(element)
        newObj.length++
    }
    return newObj
}
// Y la llamamos así:
// var newNumbers = map(numbers, function (num) {
//     return num * 2
// })
```

De primeras podemos ver que nuestra función map recibe dos parámetros: el iterable "iterable" y la función "callback" (nombres asignados por nosotros a los parámetros).

En primera instáncia creamos un nuevo objeto y le asignamos una longitud de 0, aquí es donde almacenaremos los resultados de la función callback y es el objeto que retornaremos.

Pal for:

```js
// var map = function (iterable, callback) {
//     var newObj = { length: 0 }
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]
        newObj[newObj.length] = callback(element)
        newObj.length++
    }
//     return newObj
// }
// Y la llamamos así:
// var newNumbers = map(numbers, function (num) {
//     return num * 2
// })
```

De nuevo, al declarar en for ponemos las tres típicas lineas para recorrer un iterable, "i" es igual a 0, que "i" sea menor que la longitud del iterable y en cada vuelta sumamos 1 a "i".

Bien, dentro del for, en la primera linea, al igual que hicimos en el forEach, almacenamos el valor de la posición en la que nos encontramos en la variable "element".

En la siguiente linea le asignamos a la posición 0 (teniendo en cuenta que estamos en la primera iteración y le hemos dado una longitud de 0 al iterable) el return que nos da la función callback cuando le enviamos element. Paso a paso:

Cuando entremos en callback, esta directamente retornará el valor de "num * 2", y num se refiere a lo que esta reciba por parámetro, es decir "element" y guardamos este valor en la posición de nuestro nuevo objeto.

Después aumentamos en uno la longitud del nuevo objeto, ya que le acabamos de introducir una posición.

Finalmente, después del for:

```js
// var map = function (iterable, callback) {
//     var newObj = { length: 0 }
    // for (var i = 0; i < iterable.length; i++) {
    //     var element = iterable[i]
    //     newObj[newObj.length] = callback(element)
    //     newObj.length++
    // }
    return newObj
// }
// Y la llamamos así:
// var newNumbers = map(numbers, function (num) {
//     return num * 2
// })
```

Retornamos el nuevo objeto con todas las posiciones cubiertas con el doble de las posiciones del iterable enviado a la función map.

## function-find

```js
var find = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]
        if (callback(element)) { return element }
    }
    return 'no se ha encontrado ningun elemento que cumpla con las características'
}
//Y la llamamos así
var found = find(numbers, function (element) {
    return element > 10
})
```

La función find devuelve el valor del primer elemento del array que cumple la función de prueba proporcionada (que cumpla la condición del callback)

Primero, la parte del código con la que llamamos a find:

```js
// var find = function (iterable, callback) {
//     for (var i = 0; i < iterable.length; i++) {
//         var element = iterable[i]
//         if (callback(element)) { return element }
//     }
//     return 'no se ha encontrado ningun elemento que cumpla con las características'
// }
//Y la llamamos así
var found = find(numbers, function (element) {
    return element > 10
})
```

Como find dará un return, lo almacenamos en una variable llamada "found" para luego imprimirla por consola.

A find le enviamos dos parámetros: un iterable llamado numbers(iterable con números) y una función (callback) que recibirá un argumento: un elemento, y retornará un true o un false si se cumple la condición; en este caso concreto, si "element" tiene un valor mayor a 10, el callback devolverá true.

Veamos la función find:

```js
var find = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]
        if (callback(element)) { return element }
    }
    return 'no se ha encontrado ningun elemento que cumpla con las características'
}
//Y la llamamos así
// var found = find(numbers, function (element) {
//     return element > 10
// })
```

En primer lugar, vemos que la función find recibe 2 parámetros de entrada: el primero al que llamaremos iterable, por donde entrará el iterable a recorrer, y en segundo lugar callback, la función a la que llamaremos desde find.

Vayamos al for:

```js
// var find = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]
        if (callback(element)) { return element }
    }
//     return 'no se ha encontrado ningun elemento que cumpla con las características'
// }
//Y la llamamos así
// var found = find(numbers, function (element) {
//     return element > 10
// })
```

De nuevo, las tres primeras mierdas del for son como siempre: la var "i" es igual a 0, seguiremos en el bucle mientras "i" sea menor a la longitud del iterable y aumentamos en 1 la "i" en cada iteración.

Entremos al for:

```js
// var find = function (iterable, callback) {
    // for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]
        if (callback(element)) { return element }
    // }
//     return 'no se ha encontrado ningun elemento que cumpla con las características'
// }
//Y la llamamos así
// var found = find(numbers, function (element) {
//     return element > 10
// })
```

En primer lugar creamos una var "element" donde almacenaremos la posición en la que nos encontramos del iterable según la iteración del for en la que estemos.

En segundo lugar, tenemos un if, que dice que : en caso de que la llamada a la función almacenada en callback devuelva true, retornaremos el elemento que ha cumplido la condición del callback, que recordemos que es que el elemento sea mayor a 10.

Esto quiere decir que si el valor de la posición que estamos recorriendo del iterable es mayor que 10, callback retornará true y por lo tanto entraremos al if, finalizando la función con un return ya que hemos confirmado que hay un elemento que cumple la condición del callback, y retornamos el elemento que ha cumplido esta condición.

Fuera del for:

```js
// var find = function (iterable, callback) {
    // for (var i = 0; i < iterable.length; i++) {
        // var element = iterable[i]
        // if (callback(element)) { return element }
    // }
    return 'no se ha encontrado ningun elemento que cumpla con las características'
// }
//Y la llamamos así
// var found = find(numbers, function (element) {
//     return element > 10
// })
```

En caso de salir del for, es decir, de que ningun elemento del iterable cumpla la condición del callback, retornaremos un string que nos notifica que no hay ningun elemento que cumpla con las condiciones del callback.

## function-findIndex

```js
var find = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]
        if (callback(element)) { return element }
    }
    return 'no se ha encontrado ningun elemento que cumpla con las características'
}
//Y la llamamos así:
var found = findIndex(numbers, function (element) {
    return element > 10
})
```

Esta función es exactamente igual a la función anterior (find), lo único que cambia es que el return del for devuelve el índice en el que se ha encontrado el elemento que cumple con la condición del callback, en vez del elemento en si mismo.

## function-filter

```js
var filter = function (iterable, callback) {
    var newObj = { length: 0 }
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]
        if (callback(element)) {
            newObj[newObj.length++] = element
        }
    }
    return newObj
}
//Y la llamamos así:
var result = filter(words, function (word) {
    return word.length > 6
})
```

La función filter crea un nuevo iterable con todos los elementos del iterable recibido por parámetro que cumplan la condición de la función callback (la función que entra por parámetro).

Cómo se llama a la función:

```js
// var filter = function (iterable, callback) {
//     var newObj = { length: 0 }
//     for (var i = 0; i < iterable.length; i++) {
//         var element = iterable[i]
//         if (callback(element)) {
//             newObj[newObj.length++] = element
//         }
//     }
//     return newObj
// }
//Y la llamamos así:
var result = filter(words, function (word) {
    return word.length > 6
})
```

Como filter retornará un nuevo objeto, lo almacenaremos en una var llamada "result". Para llamar a filter le enviamos 2 cosas: el iterable (en este caso un iterable llamado words con palabras) y la función que utilizaremos desde la función filter, la cual recibe por parámetro un elemento, llamado "word", y si este "word" tiene una longitud mayor tiene una longitud mayor a 6, la función retornará true, en caso contrario retornará false.

Vayamos a la función filter:

```js
var filter = function (iterable, callback) {
    var newObj = { length: 0 }
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]
        if (callback(element)) {
            newObj[newObj.length++] = element
        }
    }
    return newObj
}
//Y la llamamos así:
// var result = filter(words, function (word) {
//     return word.length > 6
// })
```

Vemos que la función filter tiene 2 parámetros de entrada: "iterable", donde le enviaremos un iterable (en este caso words) y "callback", que recibirá una función la cual llamaremos desde dentro de filter.

Al for:

```js
// var filter = function (iterable, callback) {
//     var newObj = { length: 0 }
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]
        if (callback(element)) {
            newObj[newObj.length++] = element
        }
    }
//     return newObj
// }
//Y la llamamos así:
// var result = filter(words, function (word) {
//     return word.length > 6
// })
```

Lo mismo de siempre al principio. "i" es igual a 0, i menor a la longitud del iterable para poder recorrer todo el iterable y sumamos 1 a "i" en cada iteración.

Adentro del for:

```js
// var filter = function (iterable, callback) {
//     var newObj = { length: 0 }
    // for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]
        if (callback(element)) {
            newObj[newObj.length++] = element
        }
    // }
//     return newObj
// }
//Y la llamamos así:
// var result = filter(words, function (word) {
//     return word.length > 6
// })
```

En primer lugar, como es habitual, una var "element" donde almacenamos el valor de la posición del iterable en la que nos encontramos. Después tenemos un if, y la condición de este if es la llamada a la función callback al enviarle el elemento que acabamos de almacenar. Esto quiere decir que si cuando llamamos a la función almacenada en callback enviándole el elemento almacenado devuelve true, es decir que el elemento enviado tiene una longitud mayor a 6, entraremos al if y le insertaremos al nuevo objeto que hemos creado el valor que ha cumplido con la condición, y le aumentaremos la longitud ya que hemos insertado un nuevo elemento en el iterable.

Fuera del for:

```js
// var filter = function (iterable, callback) {
//     var newObj = { length: 0 }
    // for (var i = 0; i < iterable.length; i++) {
        // var element = iterable[i]
        // if (callback(element)) {
        //     newObj[newObj.length++] = element
        // }
    // }
    return newObj
// }
//Y la llamamos así:
// var result = filter(words, function (word) {
//     return word.length > 6
// })
```

Retornamos el objeto con todos los elementos de iterable que han cumplido con la condición del callback.

## function-reduce

```js
var initialValue = 0
var reduce = function (iterable, callback, initial) {
    var result = !initial ? 0 : initial
    for (var i = 0; i < iterable.length; i++) {
        if (!initial && i === 0) { result = callback(iterable[i], 0) }
        else { result = callback(result, iterable[i]) }
    }
    return result
}
//Y la llamamos así:
var sumWithInitial = reduce(numbers, function (accumulator, currentValue) {
    return accumulator + currentValue
}, initialValue)
```

Esta es la más puta (con perdón) hasta ahora.

La función reduce ejecuta una función reductora sobre cada elemento de un iterable, y devuelve como resultado un único valor que comprima todos los elementos del iterable.

Veamos primero cuando la llamamos:

```js
// var initialValue = 0
// var reduce = function (iterable, callback, initial) {
//     var result = !initial ? 0 : initial
//     for (var i = 0; i < iterable.length; i++) {
//         if (!initial && i === 0) { result = callback(iterable[i], 0) }
//         else { result = callback(result, iterable[i]) }
//     }
//     return result
// }
//Y la llamamos así:
var sumWithInitial = reduce(numbers, function (accumulator, currentValue) {
    return accumulator + currentValue
}, initialValue)
```

Como la función reduce tiene un retorno, lo almacenamos en una var llamada sumWithInitial (nombre de MDN copiao).

Llamamos a la función reduce con 3 parámetros de entrada, veamos: en primer lugar "numbers", un iterable con números (sorprendido/a?), una función (ahora la comentamos) y la variable "initialValue" que determinamos nosotros al principio del código.

Esta función callback tiene dos parámetros de entrada: "accumulator" y "currentValue", la primera servirá de acumulador que almacena el valor total progresivamente, y "currentValue" es el valor que le estamos enviando para que lo añada al "accumulator" como podemos ver en el retorno del callback.

Un poco raro, pero con un poco de suerto quedará más claro al ver la función reduce:

```js
// var initialValue = 0
var reduce = function (iterable, callback, initial) {
    var result = !initial ? 0 : initial
    for (var i = 0; i < iterable.length; i++) {
        if (!initial && i === 0) { result = callback(iterable[i], 0) }
        else { result = callback(result, iterable[i]) }
    }
    return result
}
//Y la llamamos así:
// var sumWithInitial = reduce(numbers, function (accumulator, currentValue) {
//     return accumulator + currentValue
// }, initialValue)
```

En primer lugar, vemos que reduce recibe 3 parámetros: "iterable", el iterable a recorrer, "callback", la función a la que llamaremos desde reduce, y "inital", que será el valor inicial que hemos determinado fuera de la función.

En la primera línea declaramos una variable llamada result con un valor que determinará el ternario. El ternario dice que: En caso de que no se haya introducido un valor en "initial" (ya que es opcional) le asignaremos a result el valor 0; en caso contrario, le asignaremos a result el valor de initial.

El for:

```js
// var initialValue = 0
// var reduce = function (iterable, callback, initial) {
//     var result = !initial ? 0 : initial
    for (var i = 0; i < iterable.length; i++) {
        if (!initial && i === 0) { result = callback(iterable[i], 0) }
        else { result = callback(result, iterable[i]) }
    }
//     return result
// }
//Y la llamamos así:
// var sumWithInitial = reduce(numbers, function (accumulator, currentValue) {
//     return accumulator + currentValue
// }, initialValue)
```

Again: "i" es 0, condición de que "i" sea menor a la longitud del iterable para recorrerlo entero, en cada iteración "i" suma uno.

Dentro del for:

```js
// var initialValue = 0
// var reduce = function (iterable, callback, initial) {
//     var result = !initial ? 0 : initial
    // for (var i = 0; i < iterable.length; i++) {
        if (!initial && i === 0) { result = callback(iterable[i], 0) }
        else { result = callback(result, iterable[i]) }
    // }
//     return result
// }
//Y la llamamos así:
// var sumWithInitial = reduce(numbers, function (accumulator, currentValue) {
//     return accumulator + currentValue
// }, initialValue)
```

Antes de entrar al if, explico la condición que dice MDN (como buenamente puedo porque no la tengo 100% clara): En la primera iteración, si cuando hemos llamado a la función reduce no hemos introducido un valor inicial, llamaremos a la función "callback" enviandole la primera posición del iterable, y ningún valor actual.

Si no se entiende del todo no pasa nada, limitémonos a creer lo que dice MDN, y eso es lo que dice el if: si no hay valor inicial y es la primera iteración a la función que llamamos le enviamos la posición actual del iterable y un 0, como para darle nosotros un valor inicial. Recalcar que el resultado que devuelva la función "callback" lo almacenamos en la variable "result".

En caso contrario, entrariamos al else: result tomará el valor de la función "callback" al enviarle el resultado almacenado hasta ahora y el valor de la posición en la que nos encontramos en el iterable. De esta manera vamos acumulando en result todo lo que vamos sumando, y le vamos añadiendo lo que sea que esté en la posición del iterable.

Note: A simple vista esto lo único que hace es sumar los elementos de un iterable, pero según Frank el reduce es más complejo que eso porque se le pueden aplicar muchas funcionalidades, solo que MDN pone el caso "sencillo" en el que se suman números.

Después del for:

```js
// var initialValue = 0
// var reduce = function (iterable, callback, initial) {
//     var result = !initial ? 0 : initial
    // for (var i = 0; i < iterable.length; i++) {
        // if (!initial && i === 0) { result = callback(iterable[i], 0) }
        // else { result = callback(result, iterable[i]) }
    // }
    return result
// }
//Y la llamamos así:
// var sumWithInitial = reduce(numbers, function (accumulator, currentValue) {
//     return accumulator + currentValue
// }, initialValue)
```

Retornamos el valor que hemos almacenado en "result", que es la acumulación de todos los elementos del iterable.