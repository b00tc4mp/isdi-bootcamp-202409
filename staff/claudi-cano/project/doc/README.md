# GinRecipes

## Intro

Gin repository to let you know about the history of the gin, the best mixers & the best garniture for each one.

![](https://media.giphy.com/media/j5Eia63TiZi89wfoYo/giphy.gif?cid=790b7611iya77leuiq5z65s786ppy0qfugivuo3n4a5urwm7&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional

### Use Cases

#### User 
- explorar la web libremente
- registrarse
- cambiar datos de usuario
- poder like en los productos (likes, optional)
- comentar el producto (comments, optional)
- posibilidad de publicar tu gin (posts, optional)

#### Admin
- gestionar los post
- gestionar los comments
- añadir nuevos gins
- ban user

### UXUI Design

[Figma](https://figma.com)

## Technical

### Blocks

- App (the client-side application)
- API (the server-side API)
- DB (the database)

### Packages

- doc (the documentation)
- app (the client-side application)
- api (the server-side API)
- dat (the data model and driver)
- com (the common validations, utils, ...)

### Techs

- Frontend: HTML, CSS, JavaScript, React

- Backend: Node.js, Express

- Database: MongoDB

- Testing: Mocha & Chai for unit and API testing

### Data Model

## User
- name (string)
- email (string)
- username (string)
- password (string)
- role (string, enum: regular | registred)
- post (userId, string)
- like (userId, boolean)
- comment (userId, string)

## Product
- id (uuid)
- name (string)
- image (string)
- description (string)
- mixer (string)
- garniture (string)
- aprox price (number)

### Test Coverage
- ...