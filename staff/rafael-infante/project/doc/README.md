# Loving Hands APP

## Intro

This is a Mobile app for elderly people who need some assistance at home.

![](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3BoOGxjemJqb29kdmFjbml5dWdyemhodW03aGYzM2EwMHkyNWlkYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/icamgh2X6Cego/giphy.webp)

## Functional

### Use Cases

Regular (User)
- choose emoji
- move emoji (on screen)

Moderator (User)
- view reporting list
- view reporting detail
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

- HTML/CSS/JS (...)
- React (...)
- Node (...)
- Express (...)
- Mongo (...)
- Mocha & Chai (...)
- [...]

### Data Model

User
- name (string)
- email (string)
- username (string)
- password (string)
- role (string, enum: regular | moderator)

### Test Coverage

```sh
----------------------|---------|----------|---------|---------|-------------------
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------|---------|----------|---------|---------|-------------------
All files             |   96.96 |       50 |     100 |   96.87 |                   
 registerUser.js      |    92.3 |       50 |     100 |   91.66 | 23                
 registerUser.spec.js |     100 |      100 |     100 |     100 |                   
----------------------|---------|----------|---------|---------|-------------------
```
