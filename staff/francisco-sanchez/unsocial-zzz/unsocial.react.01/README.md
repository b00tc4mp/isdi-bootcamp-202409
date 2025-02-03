# Unsocial App - React Version

## *18/10/2024*
Inicio este documento para comentar las consideraciones de este proyecto. 

NOTA IMP: A partir de ahora el directorio unsocial.react.00 será la versión más actual de todas. 

Iré realizando copias que iran acumulando el número, pero la más reciente y actual será siempre la **unsocial.react.00.**


### ¿Quñe ampliamos en la clase? 

- Repasamos códigos y mejoramos la navegación entre secciones. 

- Implementamos las funciones submit de los botones de registro y login

- Introducimos el concepto de identificadores únicos de usuarios: https://www.uuidgenerator.net/ (a modo ejemplo)

- Creamos una función para crear identificadores de usuario únicos
    - Añadimos los id's a los usuarios

    - Añadismo los id's a los posts
        - En los posts modificamos el identificador de username por author --> Y nos traemos el user relacionado a través del id

- Modificaremos el loggedInUser por loggedInUserId --> Modificaremos la logica 

- Creamos la función getUserName --> Para recuperar el username a partir del id y mostrar el nombre en la home

- Ampliamos la funcionalidad para mostrar los posts --> Utilizamos un .map() para devolver  (La metemos en una función después)

- Modificamos la lógica de createPost --> Ahora la función no recibe userName sino, userId
    - También añadimos validaciones para que no nos entren datos incorrectos

- Creamos una nueva función CreatePost() dentro del main.jsx --> "Tipo las funciones anteriores"
    Creamos también una función para mostrar los posts (Postlist().)

- Y como ahora Home va a cambiar, cambiamos la función Home por una class

- Añadimos comentarios en todos los stios para dar mejor seguimiento

- Prepara la lógica para el createPost() aprovechando la lógica que ya teniamos

- Implementa el logout de la aplicación. 

- Implementa el localStorage para guardar la información de la aplicación en el navegador
    - https://developer.mozilla.org/es/docs/Web/API/Window/localStorage

- Introduce el sessionStorage para mantener la sesión activa del usuario
https://developer.mozilla.org/es/docs/Web/API/Window/sessionStorage

- crea un fichero uuid.js para generar los id

- modificar función para creación de usuarios, pasar id

- modificar la función de creación de posts, pasar id


#### El nuevo proceso de usuarios funcionará así

- parse() recupera el json de users de la memoria 

- Añade el nuevo usuario

- y despues lo vuelve a guardar en memoria con JSON.stringify(users)

- También implementa el sessionStorage para mantener la información del usuario. ¿¿SesionStorage?? 



### Tareas

- Modficar idUser por username, en la lista de posts



#### Notas mentales: 
- Los render solo se utilizan cuando estamos trabajando con clases, ya que estas tienen que repintar la aplicación o el objeto en cuestión. 



