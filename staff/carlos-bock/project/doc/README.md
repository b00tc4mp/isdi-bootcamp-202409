# [iMoveMe / yoMeMuevo]

## Intro

[...]

#### move with confidence


![Move](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDVnYnJpeW5qaHg2bTd4aTRhcXBxcXZwcjF2c21uZjZhYTM0a2xzNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/10LmKkoECGbzMbFzX6/giphy.gif "Moving")



## Functional 


### Use Cases

User
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
- profile page 
    -toggle posts / reviews
    -trust rating

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
- trust rating
- point level 
- reference to posts
- reference to reviews

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

Review/Recommendation
- id (UUID)
- author (User.id)
- link (website or google map)
- text (string)
- date (Date)
- net votes ([User.id - internal only])
    - not visible up votes (array - UUID)
    - not visible downvotes (array - UUID)
- archived review/recomendation


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
-