# Unsocial App - React Version

## *21/10/2024*

### ¿Quñe ampliamos en la clase? 

- Modificamos logica authenticateUser.js

- Modificamos lógica registerUser.js

    - En ambos casos valida que se le pase a la función un string con el typeof

- TAREITA: Revisar las validaciones de campos de entrada en las funciones 

- Hablamos de JSONS, (Revisar docu: https://www.json.org/json-en.html 👀)

- Realizamos un seguimiento de las llamadas de la aplicación con la herramienta: https://www.websequencediagrams.com/

- Crea una carpeta lib (temporal) y meté allí los ficheros de react y de babel para ejecutarlos en local en lugar de llamar a servers externos.  (aunque no es algo que se haga de forma habitual)

- Instala Vite en el ordenador y muestra como crear un nuevo proyecto 
https://v2.vitejs.dev/


- Procede a instalar el proyecto y lo muestra en localhost

- Una vez arrancado el proyecto lo limpia y empieza a exportarlo por archivos

    - Los archivos que antes eran js, se crearán como jsx, para que trabejen siempre con react. 

- !!Hay que tener en cuenta que cada fichero importa y exporta sus dependencias segun las necesite. 

> A tener en cuenta 
>
> Todo lo que sea reutilizable lo ponemos en Components, y este directorio a su vez lo subdividimos en functional y librari: 
>
> En **functional** metemos: Todas aquellas funciones que sean reutilizables 
>
> En **library** metemos:  ¿?¿?¿?¿?¿?


- TAREITA: Revisar la lógica para obtener el nombre de usuario de los posts. **(Repasar código de manu)**
    - Quitar mi función getUserUserName
    - Implementar una lógica dentro de getPosts para traerme el nombre de usuario de los posts
    - La nueva lógica de posts devolverá un objeto que será el id y el nombre de usuario

- TAREA PERSONAL: Mantener la sesión iniciada 





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


