# [miRed / myNetwork]

## Intro

miRed (myNetwork) is a social media network focused on creating an information network for individuals moving abroad. If you are already on ground share your own experiences and reviews with your fellow diaspora.

#### Move with confidence

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
- date of birth (string)
- trust rating (number)
- point level (number)

Recommendation (mongo)

- id (UUID)
- comments ([Comment])
- author (User.id)
- city (string)
- country (string)
- category (number, enum: 1 (paperwork) | 2 (utilities) | 3 (food) | 4 (events) | 5 (healthcare) | 6 (neighbourhoods) | 7 (accommodations) | 8 (transport) ) //consider using numbers?
- price (number, enum: 1(€) | 2(€€) | 3(€€€))
- link (string) // url || google map
- text (string)
- date (Date)
- upVotes ([User.id])//not visible
- downVotes ([User.id])//not visible
- image (string)

Comment

- id (UUID)
- author (User.id)
- text (string)
- date (Date)

Destination
-name ([string]) //country list

Country {}
-name (string)

City {}
-name (string)
-country (Country.id)

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
