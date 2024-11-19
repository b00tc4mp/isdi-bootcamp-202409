## Seteamos el enviroment:

- React + Vite + Tailwind

- React router DOM => para poder manejar las rutas de las paginas mas facilmente, podremos reutilizar los componente de manera agil y mas limpia.

- React toastify => Podremos enviar notificaciones en la web (confirmar pedidos,creacion de usuarios, productos fuera de stock, etc), +10 UX/UI

- Carpeta logic, con todas las logicas para que funcione la app

- Carpeta pages, todas las paginas por las cuales el usuario podra desplazarse

- Carpeta componentes, donde reutilizaremos estos elementos durante todo el proyecto

- Muy importante agregar el Browser Router en Main, para englobar la app dentro de las rutas, sino no funcionara NUNCA.

## Proceso:

- Agregamos las rutas de las paginas a la App.jsx (importar Routes y Route del router dom, sino la queda :c )

- Creamos el componente NavBar.jsx:
    - Lista de itemms para navegar : Utilizamos NavLink, que cosa tan linda, en vez de OnClick y todo eso, esto automaticamente re dirige si se hace click sobre el elemento a las paginas correspondientes sin tanta vuelta. 
    Le agregamos un poquito de diseño sencillo (posicion, color, gap,etc) y un subrayado que solo aparece cuando se hace click (por ende se va a la pagina correspondiente) gracias a la propieda active que nos da los anchor de NavLink , por defecto lo ponemos en Hidden y si esta active aparece nomas la barrita





