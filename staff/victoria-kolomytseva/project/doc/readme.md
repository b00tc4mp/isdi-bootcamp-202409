# [PetLocator]

## Intro

An application designed to help people find their lost pets or report pets they have seen lost.



![](https://media.giphy.com/media/XxYsESeIStBeyuVexK/giphy.gif?cid=82a1493bwnmcgc8ej1kuwmfxpdbjvczx71e6j3n0dqgaz5ij&ep=v1_gifs_trending&rid=giphy.gif&ct=g)

## Functional

### Use Cases

User
- register
- create post
- view posts
- delete post
- add comment
- view comments
- remove comment
- report user
- report post
- report comment
- contact the pet owner or the person who found the animal
- report a found pet to help reunite it with its owner
- flag a post when the pet has found its owner

Posts
- view reports
- delete post
- remove comment
- mark a post as "resolved" when the pet is found 
- view detailed information and images in a post
- contact the poster for more details via the contact info in the post

### UXUI Design

[Figma](https://www.figma.com/proto/SdVTeLToZLgnrZbtUUohRJ/PetLocator?node-id=4-3&node-type=canvas&t=MA0wRU9n3uCKroh6-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1)

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
- surname (string)
- password (string)
- city
- postal_code
- phone



Post
- id (UUID)
- author (User.id)
- image (string)
- text (string)
- date (Date)
- likes ([User.id])
- reported(boolean)
- found(boolean)

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