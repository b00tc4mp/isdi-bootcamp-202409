# [PetLocator]

## Intro

An application designed to help people find their lost pets or report pets they have seen lost.

![alt text](image.png)


## Functional

### Use Cases

 Regular (User)
- register
- create ad
- view ad
- delete ad
- add comment
- view comments
- remove comment
- report user
- report ad
- report comment
- contact the pet owner or the person who found the animal
- report a found pet to help reunite it with its owner(es cuando una persona ha encontrado una mascota perdida)
- flag a post when the pet has found its owner

Admin (User)
- view reporting list(posts denunciados)
- view reporting detail
- ban user / ad / comment


Ad
- view detailed information and images in a post
- delete post
- remove comment
- mark a post as "resolved" when the pet is found 
- contact the author of the ad for more details via the contact info in the post



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
- city(string)
- postalCode(number)
- phone(string)

Ad
- id (UUID)
- author (User.id)
- image (string)
- text (string)
- date (Date)
- likes ([User.id])
- reported(boolean)
- isFound(boolean)

Comment 
 - id (UUID)
 - author (User.id)
 - text (string)
 - date (Date) 

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