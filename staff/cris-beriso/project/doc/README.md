# MakeUp Scanner

## Intro
MakeUp Scanner is a web/app that you can use to search makeup by it name o by its properties. 
Also you can create your own list of products that you like or wish to buy. 
And you can find all the stores where you can buy those products.

![](https://st5.depositphotos.com/6844612/67044/i/450/depositphotos_670442080-stock-photo-professional-makeup-tools-makeup-products.jpg)

## Functional

### Use Cases

Regular (User)
- Search makeup.
- Search makeup stores.
- Save products as wish list.
- Add comments.
- Remove your own comments.
- Like/dislike posts.
- Propose new products to add to the data base.

Admin (User)
- Remove all comments. 
- Remove products of the data base.
- Accept proposals from regular users and add then to the data base.

### UXUI Design
[Figma]

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
- com (the common validations, utils,...)

### Data Model

User
- id (UUID)
- name (string)
- email (string)
- username (string)
- password (string)
- role (string, enum: regular | admin)

Products
- id (UUID)
- image (string)
- description (string)
- likes ([User.id])
- comments ([{
  - id (UUID)
  - author (User.id)
  - text (string)
  - date (Date) }])

### Techs

- HTML/CSS/JS (...)
- React (...)
- Node (...)
- Express (...)
- Mongo (...)
- Mongo & Chai (...)
- [...]

### Test Coverage 
[...]