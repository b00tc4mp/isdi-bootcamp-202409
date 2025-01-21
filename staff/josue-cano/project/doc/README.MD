# Ekoality
![](https://www.icegif.com/wp-content/uploads/2021/11/icegif-934.gif)
## Intro

Ekoality es una plataforma web que busca crear una red de colaboración entre agricultores profesionales, aficionados y consumidores interesados en adquirir frutas y verduras frescas, entre otras cosechas, saludables y de origen local. La plataforma proporcionará una interfaz fácil de usar y accesible, donde los agricultores podrán publicar y promocionar sus productos, compartiendo información relevante como la variedad, cantidad disponible, prácticas agrícolas y ubicación del huerto. Los consumidores, por su parte, podrán buscar y seleccionar productos según sus preferencias y necesidades, comunicándose directamente con los agricultores a través de la plataforma para acordar la recogida en un punto intermedio o el envío de los productos adquiridos.

Ekoality is a web platform aimed at creating a network of collaboration among professional farmers, enthusiasts, and consumers interested in acquiring fresh fruits and vegetables, among other healthy, locally-sourced crops. The platform will provide an easy-to-use and accessible interface where farmers can post and promote their products, sharing relevant information such as variety, available quantity, farming practices, and the location of the farm. Consumers, in turn, will be able to search for and select products based on their preferences and needs, directly communicating with farmers through the platform to arrange pickup at an intermediate point or the delivery of purchased products.

## Functional Overview

### Use cases

**User**
- Registrar
- Añadir a favoritos
- Conversar
- Ver un producto
- Publicar un producto
- Eliminar un producto

**Moderator V.1.1**
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
- Busboy
- MONGOOSE,BCRYPT,JWT,


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
- **pro** (string or Boolean?)  
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

#### Reseña V.1.1
- **id** (ObjectId)  
- **puntuacion** (number)  
- **comentario** (string)  
- **fechaCreacion** (date)   
- **escritor** (ObjectId)  
- **idProducto** (ObjectId)  

---

#### Suscripcion V.1.1
- **id** (ObjectId)  
- **fecha** (date)  
- **idUsuario** (ObjectId)  
- **precio** (number)  

---

#### Denuncia 1.1
- **id** (ObjectId)  
- **denunciante** (ObjectId)  
- **denunciado** (ObjectId)  
- **motivo** (string)  

---

## Notes


### Test Coverage


File                        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------------------|---------|----------|---------|---------|-------------------
All files                   |   99.06 |    95.31 |     100 |   99.04 | 
 products                   |   99.67 |    91.66 |     100 |   99.66 | 
  createProduct.js          |     100 |      100 |     100 |     100 | 
  createProduct.spec.js     |     100 |      100 |     100 |     100 | 
  deleteProduct.js          |   92.85 |      100 |     100 |    92.3 | 20
  deleteProduct.spec.js     |     100 |      100 |     100 |     100 | 
  getCategories.js          |     100 |      100 |     100 |     100 | 
  getCategories.spec.js     |     100 |      100 |     100 |     100 | 
  getProductDetails.js      |     100 |    83.33 |     100 |     100 | 7
  getProductDetails.spec.js |     100 |      100 |     100 |     100 | 
  getProducts.js            |     100 |    83.33 |     100 |     100 | 8
  getProducts.spec.js       |     100 |      100 |     100 |     100 | 
  getSubCategories.spec.js  |     100 |      100 |     100 |     100 | 
  getSubcategories.js       |     100 |      100 |     100 |     100 | 
 users                      |   98.77 |     97.5 |     100 |   98.75 | 
  addChatMessage.js         |     100 |      100 |     100 |     100 | 
  addChatMessage.spec.js    |     100 |      100 |     100 |     100 | 
  authenticateUser.js       |   91.66 |      100 |     100 |    90.9 | 17,27
  authenticateUser.spec.js  |     100 |      100 |     100 |     100 | 
  createChat.js             |     100 |      100 |     100 |     100 | 
  createChat.spec.js        |     100 |      100 |     100 |     100 | 
  getFavorites.js           |     100 |      100 |     100 |     100 | 
  getFavorites.spec.js      |   96.77 |      100 |     100 |   96.77 | 65
  getLocations.js           |     100 |      100 |     100 |     100 | 
  getLocations.spec.js      |     100 |      100 |     100 |     100 | 
  getUserChat.js            |   88.88 |      100 |     100 |   88.88 | 16
  getUserChat.spec.js       |     100 |      100 |     100 |     100 | 
  getUserChats.js           |   93.33 |    83.33 |     100 |    92.3 | 23
  getUserChats.spec.js      |     100 |      100 |     100 |     100 | 
  getUserDetails.js         |     100 |      100 |     100 |     100 | 
  getUserDetails.spec.js    |     100 |      100 |     100 |     100 | 
  getUserFavorites.js       |     100 |      100 |     100 |     100 | 
  getUserFavorites.spec.js  |     100 |      100 |     100 |     100 | 
  getUserProducts.js        |      80 |      100 |     100 |      80 | 14-15
  getUserProducts.spec.js   |     100 |      100 |     100 |     100 | 
  registerUser.js           |   94.73 |      100 |     100 |   94.44 | 37
  registerUser.spec.js      |     100 |      100 |     100 |     100 | 
  setUserFavorites.js       |     100 |      100 |     100 |     100 | 
  setUserFavorites.spec.js  |     100 |      100 |     100 |     100 | 
  updateUser.js             |     100 |      100 |     100 |     100 | 
  updateUser.spec.js        |     100 |      100 |     100 |     100 | 
----------------------------|---------|----------|---------|---------|-------------------


### TODO List
- https://github.com/b00tc4mp/isdi-bootcamp-202409/issues/265