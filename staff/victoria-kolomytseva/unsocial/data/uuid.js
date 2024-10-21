const uuid = () => (Date.now() + Math.random()).toString(36).replace('.', '')

//const uuid = () => ... // una función uuid no recibe ningún parámetro y devuelve el resultado de la operación que sigue.
//Su objetivo es generar un identificador único.


//Date.now() - Es un número grande que representa la fecha y hora actuales.

//Math.random() genera un número decimal  para asegurarse de que no se repita fácilmente

//Date.now() + Math.random() -  Esto da como resultado un número único que depende tanto del tiempo exacto como de un valor aleatorio.

//toString(36)  para crear identificadores más compactos.

//.replace('.', '') busca cualquier punto (.) en el resultado y lo elimina.
//Como Math.random() genera un número decimal (como 0.12345),
//es posible que en la conversión a base 36 aparezca un punto.
//Este método elimina ese punto para que el identificador sea una cadena continua sin símbolos extraños.
