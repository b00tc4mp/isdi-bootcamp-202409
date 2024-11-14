# [iMoveMe / yoMeMuevo]

## Intro

[...]

#### image goes here


## Functional 


### Use Cases

User (for example)
- create posts
- view posts
- toggole like posts
- add commment
- view comments
- remove comments
- add review
- edit review
- remove review
- report/flag content
- add wiki

Admin 
- view reports
- delete user
- delete post
- remove comment
- [...]

### UXUI Design

[Figma] (figma URL)

## Techinal Aspects

### Blocks

- App (client-side application)
- API (server-side application)
- DB (the database)

### Packages

- doc ( documentation)
- app (client-side application)
- api (server-side API)
- dat (data model and driver)
- com (common validation, utils, ...)

### Data Model

User
- id (UUID)
- name (string)
- email (string)
- username (string)
- password (string)

Post
- id (UUID)
- author (User.id)
- image (string)
- text (string)
- date (Date)
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
- Mocha & Chai (...)
- [...]

### Test Coverage

- Mocha & Chai