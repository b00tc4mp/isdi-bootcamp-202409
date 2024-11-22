# [App Name]

## Intro

[...]

![]()

## Functional

### Use Cases

User
- create post
- view posts
- toggle like post
- delete post
- add comment
- view comments
- remove comment
- report user
- report post
- report comment
- [...]

Admin
- view reports
- delete user
- delete post
- remove comment
- [...]

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

### Data Model

User
- id (UUID)
- name (string)
- email (string)
- username (string)
- password (string)
- dob (Date)
- gender (string, enum: male | female | nonbinary)
- target (string, enum: male | female | nonbinary)

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

[...]