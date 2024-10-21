# Unsocial App - React Version


## Trabajo por la tarde del 21/10/2024  WIP !!!!
Traspasar toda la app a Vite React

- Recordar revisar logica del getPosts para el nombre de usuarios en los posts
- Falla crear posts
- Falla logica de crear post


NOTA: Para mostrar ver el proyecto Vite hay que verlo en la instancia de localhost en: 

    'npm run dev




-----
### React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
-----


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



