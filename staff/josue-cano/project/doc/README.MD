# Ekoality
![](https://www.icegif.com/wp-content/uploads/2021/11/icegif-934.gif)
## Intro

Ekoality es una plataforma web que busca crear una red de colaboración entre agricultores profesionales, aficionados y consumidores interesados en adquirir frutas y verduras frescas, entre otras cosechas, saludables y de origen local. La plataforma proporcionará una interfaz fácil de usar y accesible, donde los agricultores podrán publicar y promocionar sus productos, compartiendo información relevante como la variedad, cantidad disponible, prácticas agrícolas y ubicación del huerto. Los consumidores, por su parte, podrán buscar y seleccionar productos según sus preferencias y necesidades, comunicándose directamente con los agricultores a través de la plataforma para acordar la recogida en un punto intermedio o el envío de los productos adquiridos.

Ekoality is a web platform aimed at creating a network of collaboration among professional farmers, enthusiasts, and consumers interested in acquiring fresh fruits and vegetables, among other healthy, locally-sourced crops. The platform will provide an easy-to-use and accessible interface where farmers can post and promote their products, sharing relevant information such as variety, available quantity, farming practices, and the location of the farm. Consumers, in turn, will be able to search for and select products based on their preferences and needs, directly communicating with farmers through the platform to arrange pickup at an intermediate point or the delivery of purchased products.

## Functional Overview

### Use cases

**User**
- Comprar suscripción
- Promocionar sus anuncios
- Eliminar anuncio
- Renovar anuncio
- Buscar producto
- Añadir a favoritos
- Añadir reseña
- Conversar**?
- Ver un producto
- Publicar un producto
- Modificar un producto
- Eliminar un producto
- Modificar su perfil

**Moderator**
- Leer reportes
- Banear usuarios
- Eliminar comentarios
- Shadow ban


### UXUI Design

[Figma](https://www.figma.com/design/wW51XSdrGfWxncUpZcrrz1/Ekoality-V2?node-id=0-1&m=dev&t=DpSURbf7TGpnrSSH-1)

## Technical aspect

### Blocks

- App (client-side application)
- API (server-side application)
- DB (the database)

### Packages

- doc (documentation)
- app (client-side application)
- api (server-side application)
- dat (data model)
- com (common validations)

### Techs

- HTML/CSS/JS
- React
- Next
- Node
- Express
- Mongodb
- Mocha & Chai


# Ekoality Data Model

### Collections (Ordered by Priority)

---

#### Usuario
- **id** (ObjectId)  
- **password** (string)  
- **nombre** (string)  
- **apellido** (string)  
- **email** (string)  
- **id_ubicacion** (ObjectId)   
- **fechaRegistro** (date)  
- **rol** (string, enum: "admin" | "moderator" | "user")  
- **pro** (string or Bolean?)  
- **valoracion** (number)  
- **online** (string or bolean)  
- **is_banned** (boolean)  

---

#### Categoria
- **id** (ObjectId)  
- **nombre** (string)  

---

#### Subcategoria
- **id** (ObjectId)  
- **nombre** (string)  
- **idCategoria** (ObjectId)  

---

#### Producto
- **id** (ObjectId)  
- **nombre** (string)  
- **precio** (number)  
- **descripcion** (string)  
- **imagenes** ([Imagenes])  
- **puntuacion** (number)  
- **fechaCaducidad** (date)  
- **idUsuario** (ObjectId)  
- **idCategoria** (ObjectId)  
- **idSubcategoria** (ObjectId)  
- **pro** (number, boolean?)  

---

#### Imagenes
- **id** (ObjectId)  
- **nombre** (string)  
- **idProducto** (ObjectId)  

---

#### Favoritos
- **id** (ObjectId)  
- **idUsuario** (ObjectId)  
- **idProducto** (ObjectId)  
- **fechaAgregado** (date)  

---

#### Reseña
- **id** (ObjectId)  
- **puntuacion** (number)  
- **comentario** (string)  
- **fechaCreacion** (date)   
- **escritor** (ObjectId)  
- **idProducto** (ObjectId)  

---

#### Suscripcion
- **id** (ObjectId)  
- **fecha** (date)  
- **idUsuario** (ObjectId)  
- **precio** (number)  

---

#### Denuncia
- **id** (ObjectId)  
- **denunciante** (ObjectId)  
- **denunciado** (ObjectId)  
- **motivo** (string)  

---

## Notes


### Test Coverage