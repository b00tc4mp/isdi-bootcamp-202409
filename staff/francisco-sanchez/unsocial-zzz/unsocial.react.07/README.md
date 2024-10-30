# Unsocial App - React Version

**NOTA!!!**
- La carpeta unsocial siempre será la versión mas nueva. 
- Las carpetas unsocial.X son las primeras versiones de la app y la versión mas reciente es la del numero mayor
- Las carpetas unsocial.react.00 son las que incluyen react, y la más reciente es la que tenga el mayor numero. 

- VIP! Solo la versión más reciente de unsocial mantiene la carpeta **node_modules**. Para probarlas habrá que añadir la carpeta


## **23/10/2024**

COSAS QUE NO ME FUNCIONAN
-------------------------

- Lógica que mantiene la sesión iniciada
- La gestión de la cabecera
    - Nombre del usuario
    - Botón de new post 
    - Y creo que me he cargado el boton de logout
    - El botón de like no cambia de estado
    
---------------------------

En la clase de hoy implementaremos funcionallidades a la aplicación. 

 OK - Forzamos el footer fijado al final de la página con position fixed y bottom: 0
 OK   - Consecuentemente tenemos que empujar las vistas

OK - En home, register y login,  modificamos 'section' por 'main'

OK - Fijamos el header arriba con position: fixed y bottom 0.

OK - Al poner el menú fijo deberemos verificar las alturas de las ventanas principales. (Hay que jugar con los margins y los paddings)

OK - Implementamos una lógica para mantener la sesión iniciada 

   OK - Creamos una nueva función en logic (isUserLoggedIn)
   OK - Y la llamamos desde App en el mismo sitio dónde lo teniamos
   OK  - También lo añadimos en el apartado de login
   OK  - OJO! que le cambia el nombre a la variable del sessionStorage

- Nota: Manu ha utilizado el git restore para recuperar la versión del dia anterior

OK - Modifica la función authenticatelogin.js por loginUser.js


OK - REVISAR!!!! Ha modificado las logicas dentro de logic para mejorar la semantica de la aplicación. Revisar todas! 

OK - Añadimos un contexto a la logica para mejorar la comprensibilidad, para ello lo encierra todo dentro de un objeto.

  OK  - Creamos un objeto que regule todas las logicas (index.js)
    OK    - WIP - Aquí añadimos los imports de todas las logicas
    OK    - Una ves vez hecho crea un objeto que los incluye todos 
        - Cambia todas las llamadas en el programa: ""logic.la_llamada_que_sea""

- Modificamos el botón de create post, lo quitamos de la vista principal y la pone en el footer
    OK - El createPost.jsx lo pasamos a view (A partir de ahora será una vista) ¿?¿?¿?¿?¿?¿?¿?¿
    - El createPost ya no recibe el idUser
    - Quita el botón de createPost de la home
    - En CreatePost ya no nos hará falta el props
    - En App.jsx ahora importaremos el nuevo CreatePost transformado a view
    - Del nuevo archivo exportamos varios elementos a la vez
    - Y en app también los importaremos en bloque
    - En el footer con botón ahora le tenemos que passar el evento onNewPost.
    - Utiliza un modificador del botón: 
    
    >  .Button {}
    >
    >  .Button--light{} (para el invertido)

    - Hace una lógica en la llamada a la función del botón para mostrarlo en claro o oscuro depende de la situación. 

- En este punto la nueva vista create post ya debería funcionar, pero tenemos mucho que arreglar

- Desde app ahora tenemos que passar la view a home
    - Y desde footer capturamos la vista en la que estamos para mostrar o no el botón 

    - También hace lo mismo en el header para añadir un link o no al titulo de la red social para volver atrás. Le tiene que pasar un callback a onHomeClick para volver atras. 

- A partir de ahora ampliamos la funcionalidad de like post ♥️
    - Transformamos el bloque de post en un PostItem.jsx
    - Ya que estamos indexamos todas las funciones contenidas en functional (lo mismo que hemos hecho para logic).
    - también indexamos library
    - En el nuevo PostItem desestructura item para que el código quede más limpio 
    - Cambia las llamadas a los imports por las nuevas indexaciones
    - Añade el botón (por fin) debajo de time. 
    - Crea un array de likes dentro de posts (en el que guardaremos los id de usuarios que han dado like)
    - **UPDATE** --> Actualizamos la base de datos (ver script)
    - En el onClick del botón like llama a una nueva función para añadir el like en la que le pasaremos (idPost)
    - Creamos la nueva función toggleLikePost.js (solo js por que es pura logica, no hay nada de presentación)
    - Logica
        - sacamos posts
        - evaluamos id
        - desestructuramos post para sacar los liks
        - desestructura sesionstorage para sacar el userid
        - finalmente hacemos el push al array likes
        - exportamos la función
    - En la capa de getPosts validamos si un idUser ha dado like para mostrar el botón de like de una forma u otra. 
    - Finalmente también tendremos refrescar el PostList
        - Modificamos el PostList a class que extiende de Component
        - Con su constructor y su super

- Quita el nombre del usuario de la home 
- Y lo mete en la cabecera 
- Añade una validación para que solo muestre el nombre si está logueado
- También sube el botón de logout a la cabecera y lo quita de home
     





## **22/10/2024**

- Hoy presentamos figma y empezamos a diseñar nuestra futura aplicación allí. 

- Creamos un compo Header.jsx 

- Empezamos con estilos css

    OK - Creamos un estilo Header.css  para la cabecera y lo metemos dentro de la carpeta components junto a header
    
    OK - Creamos un Login.css para el login y lo metemos dentro de view junto al login.jsx

    - Hacemos que el login esté centrado horizontal y verticalmente 

OK - Creamos un footer con con su función footer.jsx que devuelva un texto de ejemplo, también le añadimos estilos, lo metemos en la home.

OK - Booooomba! -> Se pone a componetizar todo con sus css incluidos y todo separado. 

   OK - Input
   OK  - PasswordImput
   OK   - Quita los estilos de los elementos y crea nuevas clases 
    
    OK - Luego modifica las vistas register y login para añadir los nuevos compos de input. (por tanto hay que importarlos).

    OK - Creamos más compos: 
        - Button
        - Label

    OK    - *Al en la función que costruye al botón ha incluido sus children... (ir con cuidado)
    
    OK - El formulario también va a ser un compo 
        - Tanto en el compo de Form, y del botón, se les tiene que traspasar el onClick porque ahora son ellos los que construyen.

    OK - Creamos un compo Field.jsx para agrupar el label y el input. 
        - Lo agrupamos dentro de un div. 
        - Creamos también sus estilos
        - Al final pone el compo field para agrupar o encerrar los label / input


    OK - Creamos el compo para el label 

    OK - Tras arreglar el Login, procedemos a arreglar el Register. 






NOTAS: 

- Los titulos H llevan implicitos margenes superiores, los podemos quitar para pegar un texto a la parte superiro
- La unidad rem (unidad relativa del root)
- Cada Compo tiene que tener su propio archivo css 
- la propiedad box-sizing: border-box -> hace que aplique de borde a borde





## *21/10/2024*

### ¿Que ampliamos en la clase? 

OK - Modificamos logica authenticateUser.js

OK- Modificamos lógica registerUser.js

   OK - En ambos casos valida que se le pase a la función un string con el typeof

OK -  TAREITA: Revisar las validaciones de campos de entrada en las funciones 

OK - Hablamos de JSONS, (Revisar docu: https://www.json.org/json-en.html 👀)

OK - Realizamos un seguimiento de las llamadas de la aplicación con la herramienta: https://www.websequencediagrams.com/

OK - Crea una carpeta lib (temporal) y meté allí los ficheros de react y de babel para ejecutarlos en local en lugar de llamar a servers externos.  (aunque no es algo que se haga de forma habitual)

OK - Instala Vite en el ordenador y muestra como crear un nuevo proyecto 
https://v2.vitejs.dev/


OK - Procede a instalar el proyecto y lo muestra en localhost

OK - Una vez arrancado el proyecto lo limpia y empieza a exportarlo por archivos

   OK - Los archivos que antes eran js, se crearán como jsx, para que trabejen siempre con react. 

OK - !!Hay que tener en cuenta que cada fichero importa y exporta sus dependencias segun las necesite. 

> A tener en cuenta 
>
> Todo lo que sea reutilizable lo ponemos en Components, y este directorio a su vez lo subdividimos en functional y librari: 
>
> En **functional** metemos: Todas aquellas funciones que sean reutilizables 
>
> En **library** metemos:  ¿?¿?¿?¿?¿?



- TAREITA: Revisar la lógica para obtener el nombre de usuario de los posts. **(Repasar código de manu)**
    OK - Quitar mi función getUserUserName
    - Implementar una lógica dentro de getPosts para traerme el nombre de usuario de los posts
    - La nueva lógica de posts devolverá un objeto que será el id y el nombre de usuario

- TAREA PERSONAL: Mantener la sesión iniciada 


### Trabajo por la tarde del 21/10/2024  WIP !!!!
Traspasar toda la app a Vite React

OK - Recordar revisar logica del getPosts para el nombre de usuarios en los posts
OK - Falla crear posts
OK - Falla logica de crear post


NOTA: Para mostrar ver el proyecto Vite hay que verlo en la instancia de localhost en: 

    'npm run dev


-----
### React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
-----



## *18/10/2024*
Inicio este documento para comentar las consideraciones de este proyecto. 

NOTA IMP: A partir de ahora el directorio unsocial.react.00 será la versión más actual de todas. 

Iré realizando copias que iran acumulando el número, pero la más reciente y actual será siempre la **unsocial.react.00.**


### ¿Quñe ampliamos en la clase? 

OK - Repasamos códigos y mejoramos la navegación entre secciones. 

OK - Implementamos las funciones submit de los botones de registro y login

OK - Introducimos el concepto de identificadores únicos de usuarios: https://www.uuidgenerator.net/ (a modo ejemplo)

OK - Creamos una función para crear identificadores de usuario únicos
    - Añadimos los id's a los usuarios

OK    - Añadismo los id's a los posts
OK    - En los posts modificamos el identificador de username por author --> Y nos traemos el user relacionado a través del id

OK - Modificaremos el loggedInUser por loggedInUserId --> Modificaremos la logica 

OK - Creamos la función getUserName --> Para recuperar el username a partir del id y mostrar el nombre en la home

OK - Ampliamos la funcionalidad para mostrar los posts --> Utilizamos un .map() para devolver  (La metemos en una función después)

- Modificamos la lógica de createPost --> Ahora la función no recibe userName sino, userId
    - También añadimos validaciones para que no nos entren datos incorrectos

- Creamos una nueva función CreatePost() dentro del main.jsx --> "Tipo las funciones anteriores"
    Creamos también una función para mostrar los posts (Postlist().)

OK - Y como ahora Home va a cambiar, cambiamos la función Home por una class

OK - Añadimos comentarios en todos los stios para dar mejor seguimiento

OK - Prepara la lógica para el createPost() aprovechando la lógica que ya teniamos

OK - Implementa el logout de la aplicación. 

- Implementa el localStorage para guardar la información de la aplicación en el navegador
    - https://developer.mozilla.org/es/docs/Web/API/Window/localStorage

- Introduce el sessionStorage para mantener la sesión activa del usuario
https://developer.mozilla.org/es/docs/Web/API/Window/sessionStorage

OK - crea un fichero uuid.js para generar los id

OK - modificar función para creación de usuarios, pasar id

OK - modificar la función de creación de posts, pasar id


#### El nuevo proceso de usuarios funcionará así

OK - parse() recupera el json de users de la memoria 

OK - Añade el nuevo usuario

OK - y despues lo vuelve a guardar en memoria con JSON.stringify(users)

- También implementa el sessionStorage para mantener la información del usuario. ¿¿SesionStorage?? 



### Tareas

OK - Modficar idUser por username, en la lista de posts



#### Notas mentales: 
- Los render solo se utilizan cuando estamos trabajando con clases, ya que estas tienen que repintar la aplicación o el objeto en cuestión. 



