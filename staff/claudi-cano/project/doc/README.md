# GinRecipes

## Intro

Gin repository to let you know about the history of the gin, how its made, the best mixers and the best garniture for each one.

![](https://media.giphy.com/media/j5Eia63TiZi89wfoYo/giphy.gif?cid=790b7611iya77leuiq5z65s786ppy0qfugivuo3n4a5urwm7&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional

### Use Cases

#### User 
- create/update/delete own product
- update personal info
- like/unlike product
- create/delete a comment
- save/unsafe product

#### Admin
- create/update/delete any product
- create/delete any comment
- delete user

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
- id (uuid)
- name (string)
- email (string)
- username (string)
- password (string)
- role (string, enum: regular | admin)
- saved ([Product.id])

## Product
- id (uuid)
- author (User.id)
- name (string)
- date (Date)
- image (string)
- description (string, maxLength)
- mixer (string)
- garniture (string)
- price (number)
- likes ([User.id])
- comments ([Comment])

## Comment
- id (uuid)
- author (User.id)
- content (string)
- date (Date)


### Test Coverage
- ...