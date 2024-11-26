# [miRed / myNetwork]

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
- archive review or post
- [...]

### UXUI Design

[Figma] (https://www.figma.com/proto/3IrAr9aFkVc10tHArfxG2g/App?node-id=0-1&t=8uDxRWgt43JHPKKw-1)

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
- role (user || admin)
- name (string)
- email (string)
- username (string)
- password (string)
- date of birth (string, not displayed)
- trust rating (number)
- point level (number)
- reference to posts/post id (array)
- reference to reviews /review id (array)

Post (array of objects)
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

Review/Recommendation (array of objects)
- id (UUID)
- author (User.id)
- city (string)
- country (string)
- link (website or google map)
- text (string)
- date (Date)
- net votes ([number (upVote.length - downVote.length)])
    - not visible up votes (array - UUID)
    - not visible downvotes (array - UUID)
- archived review/recomendation

Location
-countryList [array]
-country [array of objects]
    -spain object (array of cities)
    -germany object (array of cities)

### Techs

- HTML/CSS/JS (...)
- React (...) (React Native?)
- Node (...)
- Express (...)
- Mongo (...)
- Mocha & Chai (...)
- [...]

### Test Coverage

- Mocha & Chai
-