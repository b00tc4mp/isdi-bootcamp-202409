# Unsocial App - React Version

**30/10/2024**
## A partir de hoy **30/10/2024** la aplicación incluye la redistribución de carpetas incluyendo la nueva API


**NOTA!!!**
- La carpeta unsocial siempre será la versión mas nueva. 
- Las carpetas unsocial.X son las primeras versiones de la app y la versión mas reciente es la del numero mayor
- Las carpetas unsocial.react.00 son las que incluyen react, y la más reciente es la que tenga el mayor numero. 

- VIP! Solo la versión más reciente de unsocial mantiene la carpeta **node_modules**. Para probarlas habrá que añadir la carpeta


### **Cosas que podemos hacer**   
- Un chat
- Guardar favoritos
- Añadir comentarios --> OK
- Editar posts
- Página de perfil --> OK
- Imagen de perfil 
- Guardar posts favoritos
- Mensaje de aviso de cumpleaños

### **Checks mejora**
- Campo password no resetea cuando está mal.
- Revisar css de createPost
- Revisar css de viewProfile
- Revisar css en general
- Pre-cargar localStorage si no existe -> KOOOO

### **Pendientes último dia**
- Modifica item --> Comment (En PostItem.jsx) --> OK
- Cambia nombre PostList.jsx --> Posts.jsx
- Cambia nombre PostItem.jsx --> Post.jsx --> OK
- Y todas sus llamadas y referencias subsiguientes en css


-----------------------------------------------------------------

# Diario de tareas en clase

## **13/11/2024**
### Continuamos con el manejo de errores personalizados

- OK -: Creamos una función errorHandler en index de api para manejar los errores y simplificar el código 
- OK -: Crea un middleware/helper (llamale como quieras), con un CreateFunctionalHandler ¿?¿??¿?¿?¿?¿?¿?¿?¿
- OK -: También crea un authoritzationHandler. 
- OK -: Cuando lo tiene montado, se lleva las funciones y crea nuevos archivos en api > helpers (createFunctionalHandler.js, authoritzationHandler.js)
- OK -: Los importa desestructurando en el index. 

- TODO: ENTENDEEEER!!! 
- OK -: Revisar las versiones de index una a una 

- OK: En com > errors.js hace una cosa similar para simplificar los errores.
- NOTA: La última versión de estos archivos podría fallar en Safari, por lo que podría ser una mejor idea no dejarlo tan avanzado 

### Mongoose

- OK -: en la carpeta dat tenemos que desinstalar Mongo ( > npm un mongo )
- OK: Instalamos Mongoose ( > npm i mongoose) (Mongoose agrega valor a mongo)
- TODO: dat > crea demo.js
    - Dentro podemos crear modelos de datos. 
    - Creamos esquemas y modeles (schema y model)
        - Dentro del esquema podemos añadir validaciones 
        - En el campo de email le pasar la regex como match para validarla 
- TODO: Los modelos creados en Demo los quita y los añade a un documento models.js -> Los exportaremos y posteriormente los podremos imporar del resto de la aplicación 
- TODO: También crearemos un modelo para comments, que se guardará dentro de post. 

- TODO: En index de Dat, cambia la importación de mongo por la de mongoose
    - Modificva el connect por lo de mongoose 

- TODO: en Api > logic > registerUser.js --> Importa models y modifica la lógica para arrancar con mongoose. 

- TODO: Lo mismo para Api > logic > authenticateUser.js

- TODO: **NOTA**: Tenemos que quitar todos los ...fromexstring... por el new Object(IdLoquesea...)
    -- ObjectId.createFromHexString(userId)





## **12/11/2024**
### Introducimos errores personalizados

- OK - Crea un errors.js dentro de com
- OK -Crea algunos errores y los exporta en el objeto errors
- Los importa en el index. 
- Lo importa en el validate.js de API. 
- Cambia todos lo new Error por new ValidationError
- En error también crea un error para reigstros duplicados 
    - Lo aplica en registerUser.js
    - Añade el duplicityError y el SystemError
- Modifica dos rutas en index.js de la api
    - users/auth
    - ...
- AuthenticateUser.js --> creamos un error de credenciales
- getUserName.js --> 
- registerUser.js de la app --> crea un const constructor con un callback para manejar los errores
    - Lo modifica masivamente en todas las lógicas de App

- También hay que revisar los xhr de la app y los compos de front de react. 

- Antes de los xhr de las llamadas, a javascript, definimos un systemError para controlar los errores del servidor. 





## **11/11/2024**
### Introducimos Mongo y conectamos nuestra API con la nueva base de datos: 

- Hacemos un repaso del fin de semana y dudas. 

En clase: 
- Modificamos addComment
- getPosts.js
    - Montamos la cadena de promesas para sacar bien toda la información de posts 
    - Montamos toda una nueva lógica que hay que entender 
    - Modifica index para getPosts.  get('/posts')
    - ToggleLikePosts 

## **08/11/2024**
### Introducimos Mongo y conectamos nuestra API con la nueva base de datos: 

Este día hacemos una introducción a mongodb y cómo conectar los métodos con la base de datos.
De deberes para el fin de semana se nos encarga hacer todos los métodos con mongo. 



## **06/11/2024**
### Hoy traspasamos la aplicación a Hooks 
Nos vamos a cargar todas las clases y lo volveremos a pasar a funciones. 

- OK -Lo primero que hace es nombrar todas las funciones para que se vean bien en el inspector de react

- OK: App -> Importa useState y lo mete en el export default de app. --> Mirar --> https://developero.io/blog/react-hooks-tutorial-en-espa%C3%B1ol#manejo-de-estados-con-usestate
    - Esto proporciona un array que devuelve dos posiciones, "view, y setView"

- OK: Posts.jsx -> Importa useEffect y useState --> 
    - useEffect: https://developero.io/blog/react-hooks-tutorial-en-espa%C3%B1ol#ciclo-de-vida-de-un-componente-con-useeffect

- OK - : Comments.jsx -> Importa useEffect y useState
    - Cambia los nombres de onRemoved y on... por handle... 

- OK -: Header.jsx (lo mismo que los dos anteriores)
    - ComponentWillReceiveProps

- OK: PasswordInput.jsx -->





## **05/11/2024**
### Continuamos trasladando la API a unsocial

- OK - : Modifica loginUser.js --> Le mete el xhr
    - Si todo ha ido bien devolvemos el callback con un null. (mantenemos la sesión de usuario)
    - En caso contrario, devolvemos el error y el mensaje 
- OK - : En el Login.jsx modifica la logica del login con el callback


- OK - : Modificamos la lógica dentro de components > getUsername en Header.jsx
    -OK -  Modificamos la lógica actual de getUserName por el callback
    - OK -  El name ahora lo tendremos que passar en el state (this.setState({ name }))
        - OK -  Por tanto tenemos que cambiar la función a un class extends Components
        - OK -  Hay varios puntos modificados, en lo que refiere a view y props. (revisar bien el código)
        - OK -  AL LORO ---> concepto componentDidMount() --> Entendre be!!!! 

        OK: Revisar per que no funciona el click del viewProfile

- OK - : Modificar la logica del getUserName.js con el nuevo callback del xhr

- Hablamos de Home.jsx, pero lo dejamos para más adelante

- OK -: Modificamos Posts.jsx (En mi caso postList)
    - OK - importamos logic
    - OK - con el componentDidMount() gestionamos la logica de la llamada a getPosts()
    - OK - Tenemos que replicar la misma logica en todos los eventos de Posts.jsx
    - OK: El render no lo tocamos  (Lo tocaré luego)

- OK -: Vamos a modificar la logica del getPosts.js con el callback nuevo
    - Como en los anteriores casos, utilizamos el xhr para traer los posts

- OK: Modificamos la view de CreatePost.jsx
    - OK - : Modificamos logic > createPost.js con el xhr de la api. 

- OK -: En el render de App.jsx añadimos algunos métodos para mejorar legibilidad 

- OK -: Se carga Home.jsx, y su lógica la mete dentro de Posts.jsx. 
    - Y se cambian todas las referencias de Home a > Posts, para que ahora Posts sea la vista inicial 
    - OJO!!! Hay muchas referencias
    - OK -: hay que cambiar también el footer para mantener el boton de create post

- OK: En Post.jsx -> modificamos handleLikeClick y handleDeleteClick
    - OK - : Modificamos la logica de deletePost.js con el el xhr y el callback para controlar los errores


- OK -: Modificamos la logica del toggleLikePost.js con el xhr. 
    - ¿¿?¿?¿?¿ Algún sitio más? 

- OK -: Modificamos AddComment.jsx
    - OK - Modificamos la llamada asíncrona al addComment()
    - OK - Modificamos el addComment.js con el calback para manejar el xhr desde la api. 

- OK -: Modificamos Comments.jsx, como los anteriores lo pasamos a asíncrono

- OK -: Modificamos getComments.js (asíncrono)
    - El callback en este punto si que devuelve un 200 porque aquí si que devuelve información. 

- OK -: En Comment.jsx también tenemos que modificar el handleDeleteComment
    - OK - Modificamos logica removeComments.js para usar el xhr y hacerlo asíncrono. 


- OK: en validate.js de la app hacemos un validateCallback, y esto hay que modificarlo en todos los sitios de la app. 

- OK - : En index de la api modificamos get server.get userid.... 
    - En el getUserName.js --> también modificamos 
    - También tendremos que modificar los tests
        - get-user-name.sh
        - y el get-user-name.js (el de xhr)




### Cosas nuevas
- OK: En Comments.jsx, dentro del render Comment, añadimos un key={comment.id}. (lo haremos en todos los stios que hacemos un map)

- Dentro de posts también lo hacemos 

Al poner un ID único en Key, hace que React solo recargue aquello que ha tenido alguna modificación y no toda la página. De esta manera hacemos que la página recargue mas rápido. 


#### Creamos un nuevo paquete para poner cosas comunes. 

- OK - A la misma altura que api y app creamos una nueva carpeta que se llame "com" (Cosas comunes)
    - OK - inicializamos con npm init --yes
    - OK - Modificamos el package.json (versión 0)
    - OK - Hay que añadir el type module en le package
    - OK - Tenemos que poner un index.js (dentro de la carpeta pone las validaciones y las importa en el index)
    - OK - Instala el paquete dentro de la app 
        npm install ../com
    - En todos los stios donde lo importamos ahora lo tenemos que desestructurar






## **04/11/2024**
### Terminamos la API
Hoy terminamos todas las lógicas de la API, aquí está el flujo para crear los archivos

--------------------------------------------
Flujo de creación de los archivos para la API
    
**LOGIC**
1. Crear el xxx.test.js --> Para hacer la prueba directa.
2. Creamos el xxx.js --> Es la lógica como tal.
3. Añadimos la logica xxx.js en el index.js de logica


**INDEX.JS de la api**
4. Hay que añadir la nueva lógica con la nueva url al index.js de la api.


**TEST**
5. Crear el xxx-xxx.sh --> para hacer la prueba en linea de comandos en terminal
6. Crear el xxx-xxx-js (para el xhr) --> Para probar en consola del navegador
--------------------------------------------

### Integramos la api con la app
- Añadimos el start en el package.json de la app
- Vemos que nuestra app arranca vite con un puerto, mientras que la api arranca con otro puerto
- Esto provoca un error CORS
    - URL: https://www.labsmobile.com/es/blog/que-es-el-error-cors-y-cuando-se-produce
    - URL2: https://developer.mozilla.org/es/docs/Web/HTTP/CORS/Errors

    - Esto está relacionado con las optiones del navegador
    - URL: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS

- LO QUE TENEMOS QUE HACER
    - OK- instalar CORS (npm install cors) --> Luego lo usamos en la api
    - OK - Revisar lo que manu ha hecho en index.js de la api 
    - OK - Añadimos el server.options dentro del index de la api 
        (Esto ya no lo hacemos con el cors)
        Access-Control-Allow-Origin: http://example.com
        Access-Control-Allow-Methods: POST, GET, OPTIONS
        Access-Control-Allow-Headers: Content-Type, Authorization... (Si ponemos un '*' los permitimos todos)
    
    - OK - : Modificamos el registerUser.js de la App utilizando la llamada a la api XHR
    - OK - : Modificamos registerUser.js con la respuesta correcta de xhr, y añadimos un callback en el export default. 
    - En caso que la api devuelva error, tenemos que parsear la respuesta con lo que nos devuelve (error, message)
        - Y esto se lo pasamos al callback
    
    - Y esta respuesta la va a usar el compo view de Register.jsx (el de react)
        - Dentro del try de la lógica usaremos lo que nos retorna el callback  
    




## **30/10/2024 **

**Ya hemos visto un poco las lógicas de server, hoy lo implementaremos en nuestra app**

- OK - Inicializamos el paquete y importa express
    - OK - npm init --yes
    - OK - npm i express
- OK - Se trae la lógica de playground a la app (git checkout rama "nombre de carpeta"). 
- OK - Hace la limpieza 
- OK - Empieza a preparar el index.js dentro de la carpeta api. 
- OK - Para probar que funcione podemos pasarle los datos en JSON de la siguiente manera: 

- curl -H 'Content-type: application/json' -d '{"username":"pepitogrillo","passowrd":"123123123"}' http://localhost:8080/login -v

- Empieza a preparar la lógica para crear un post 




## **28/10/2024**

**Hoy comenzamos a trabajar en el back.**

- OK - Hacemos una redistribución de carpetas. A partir de ahora dentro de unsocial tendremos: 
    - OK - /app: para todo lo que es la aplicación
    - OK - /api: para todo aquello relacionado con el back 

- unsocial
    - api (Aquí irán los archivos para las apis)
    - app (Archivos de la aplicación)
    - zzz (Versiones antiguas de App)

- actualizamos el package.json
- se situa en la carpeta api
- npm init --yes (esto crea un paquete por defecto)

- creamos un archivo index.js con touch (dentro de api)
    - Crea un server con una escucha

- en api también creamos un archivo client.js
    - El cliente en este caso crea una conexión


- Separa cliente y servidor a dos columnas en VSC y prueba que transmiten

- Interpetamos el inicio de un chat
    - Usamos la libreria de readline 


- **Para la tarde jugamos en playground**

    - replicar el chat de manu




## **25/10/2024 **

**Hoy implementamos la funcionalidad de comentarios.**
    
- **Funcionalidad comentarios. --> Los incluiremos dentro del propio post!!**
    
- **Logic: Crear addComment.js**
    - OK - Modificamos la base de datos de posts y añadimos los comentarios
    - OK - Creamos función y Le pasamos el postId y el comentario
    - OK - Metemos varias validaciones 

    - OK - buscamos el post de la base de datos y desestructuramos su id
    - OK - Si el post no existe --> Error
    - OK -Hacemos un push que añada el un objeto al array de comentarios que incluya: 
        - id
        - author
        - text
        - date: new Date
    
    - OK - En la lodica del getPosts -> Añadimos los comentarios 
    - OK - Agrega addComent al index de logic

- **Logic: Traer comentarios: getComments.js**
    - OK - Busca el post y lo valida 
    - OK - Lo desestructura con el id
    - OK - Si no lo encuentra muestra error
    - OK - Si todo ha ido bien, 
        - OK - Para cada comentario de post (desestructura)
        - OK - Saca el authorId
            - OK - busca el nombre de usuario (del comentario) por el id
            - OK - desestructura el author del comentario 
    - OK - agrega el getComments al index de logic

- **Añadimos Prop en PostItem.jsx para mostrar el comentario**
    - OK - Comments.jsx --> importa la logica del getComment.
    - OK - Creamos una función y le pasamos postId
    - OK - recupera los comments
    - OK - Edita el html previo con la función comment.map para recuperar la info

- **Implementar la lógica del addComment al formulario**
    - OK -  Desestructura del formulario la variable text
    - OK -  Comments.jsx añadimos evento onSubmit en el formulario
    - OK -  validamos errores
    - OK -  al logic.addCommment le pasamos postId y texto
    - OK -  Passamos la función a clase para manejar la vista
    - OK -  preparamos el render de la clase
    - OK -  Como actualizamos la lista, le tenemos que volver a pinar los comentarios
    - OK -  OJO!!! Para refrescar cada vez, nos tenemos que referir a la vista siempre con el this.props...

- **Nuevos compos**
    - OK - Comment.jsx --> Traspasamos el comentario a compo (en todo el bloque= )

    - CUIDADOOOOOO!!! CUIDADOOOOOO!!!  CUIDADOOOOOO!!!  CUIDADOOOOOO!!! 
        - Cambia nombre PostList.jsx --> Posts.jsx
        - Cambia nombre PostItem.jsx --> Post.jsx
        - Y todas sus llamadas y referencias subsiguientes en css

    - OK -  AddComment.jsx --> Para poner todo el formulario de comentarios

    - OK -  Crea una nueva vista 

    - ¿?¿?¿?¿?¿? ENTENDER LOGICA DEL TRASPASO ENTRE CAMBIOS DE VISTAS ¿?¿?¿?¿?


- **AL LORO**
    - Modifica item --> Comment


- **Eliminar comentario**
    - OK -  Crea logic -> removeComment.js
    - OK -  le passamos postId y comentId
    - OK -  Valida posibles errores
    - OK -  Recuperamos los posts
    - OK -  Recoperamos post por id 
    - OK -  Recuperamos los comentarios del post 
    - OK -  Buscamos el indice del comentario que le estamos pasando 
    - OK -  Valida que exista
    - OK -  Buscamos el autor del comentario, si el comentario no es mio muestro un error y no permito borrar
    - OK -  Si existe se lo carga con un splice(index, 1) 
    - OK -  Actualiza la base de datos 
    - OK -  Lo añadimos al index de logic 
    - OK -  Nos vamos al compo Comment y le añadimos un botón de borrado
    - OK -  Y al evento onclick del botón llamamos a la de removeCommnet.js (le tenemos que pasar post id y id del comentario)
    - OK - Le pasamos el evento onRemove para actualizar la vista despues de borrar
    - OK - En comment.jsx condicionamos la visibilidad del botón borrar si somos el autor del comentario

    - OK - Una ultima cosa: en getPosts.js contamos el numero comentarios del post
    - OK - Y en Post.jsx lo desestructuramos para mostrarlos.
    - OK - Por tanto tenemos que avisar a Posts.jsx para que se actualice, para ello reaprovecharemos el evento onDeleted. 
    - OK - Seguimos en Post.jsx, para añadir el evento on Add... 
        - OK - Nuevos métodos
            - OK - onCommentRemoved
            - OK - onCommentAdded


- **Añadimos los eventos en funciones separadas**
    -  OK - View: 
        Separa las funciones 
            handle"loquesea"
    -  OK - Functional:
        - Cuidado con los que son de clases, hay que pasarlas con el this

    - ...

    -  OK - Al final quedará todo un poco más ordenado. 



- **Pequeña referencia a lo de ayer**
    - OK - en el deletePost.jsx, añadimos una validación para no permitir borrar un post si no somos el autor del mismo. (Ojo, a nivel de lógica, no botón)



- **Mas cosas**
    - OK -  Creamos carpeta helpers **dentro de logic** para validar todas las logicas
        - OK - Creamos archivo validate.js
            - OK - Metemos validaciones de registerUser
                - OK - **Al final del validate.js metemos todas las validaciones en la const validate y exportamos**
                - OK - Esto lo podremos reutilizar en otros sitios
            - OK - Metemos validaciones de createPost
            - OK - Validaciones de loginUser
            - ...
        - OK - TAREA!! -> Buscar info y probar los default parameter ES6!!!





## **24/10/2024 **

**Hoy implementamos más funcionalidad.** 

- **Añadiremos un botón para eliminar posts**
   OK - Añade botón papelera al lado de likes (en PostItem)
   OK - Logic -> creamos función deletePost
   OK  - OJO!!! -> Mirar apartado Super VIP antes de continuar.
   Ok - Logic -> crea función getUserId (para saber si un post es mio o no)
   OK - Al botón añadido en PostItem le añade la función para mostrarse o no en función si getUserId confirma que el post es nuestro.
   OK - escribe la lógica de deletePost
   OK     - busca el post con findIndex (para que nos devuelva su indice en el array) y desestructura su id
   OK     - lo elimina del array con splice
   OK     - actualiza el array posts en localstorage
   OK     - por ultimo importa deletePost en index.js
   OK     - Y en post item llama a la función con el evento onClick
   OK     - La última cosa es añadir un confirm para evitar el borrado accidental.
        

- **Cosas varias**
    - Metemos un heigth de 3rem en header y footer
    - createPost.js la vuelvo a dejar como new Date()

    - Operamos con fechas
    OK - Preparamos una función para mostrar el tiempo que hace que se publicó
    OK    - Crea carpeta utils -> Guarda la nueva función
        - Llama a la nueva función en el PostItem.jsx
    - Añade estilos a su createPost.jsx



- **Implementamos función de comentarios**
   OK - En postItem añadimos un botón para añadir comentarios
   OK - En Functional creamos Comments.jsx
   OK     - Será una section con una lista dentro UL, LI y un Form. 
   OK  - Lo importamos en Index.js (de functional)
   OK - PostItem.jsx tendrá que importar 



- **¡¡¡Super VIP!!!!**
  OK  - modifica todos los export default... --> ahora hace los exports directamente en la declaración de la función
    NOTA: "Podemos eliminar los nombres de las funciones con tranquilidad, ya que el import lo recuperará del nombre del archivo"
    
   OK - Prestar atención a los exports de los compos, especialmente los que retornan con funciones flecha "=>", aquí eliminamos el return subsiguiente. (Si hay consoles log de momento no los tocaremos) 








## **23/10/2024**

COSAS QUE NO ME FUNCIONAN
-------------------------

(Solved) - Lógica que mantiene la sesión iniciada
(Solved) - La gestión de la cabecera
(Solved)    - Nombre del usuario
(Solved)    - Botón de new post 
(Solved)    - Y creo que me he cargado el boton de logout

 Pending!   - El botón de like no cambia de estado
 Pending!   - Revisar estilos createPost 
 Pending!   - QUe no permita publicar si imagen o texto está en blanco

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


