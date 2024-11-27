# NAME TO BE DETERMINED

## Intro

{name} es una app para encontrar a personas con que las charlar en ese tiempo libre entre trabajo, clases, aviones, trenes etc.. donde no tienes nada que hacer pero tampoco te puedes mover mucho de tu lugar.
El usuario podra crear un meet, que sera un punto en el mapa, indicando el lugar y tiempo donde se encuentra/estara. Los usarios al abrir la app, podran ver una lista/un mapa con los meets, y se podran unir a el despues de abrir un chat y confirmar sitio y lugar con la persona creadora del meet.

## Functional Overview

### Use cases

User
- create profile
- add/ edit/ delete interest/ topics of chat
- add/ edit/ delete meet
- review feedback about meet
- report if meet was not apropriate
- join meet
- search for meets with filters
- chat

Moderator
- read reports
- ban users
- remove comments
- shadow ban?


### UXUI Design

[Figma] (figma url)

## Technical aspect

### Blocks

- App (client-side application)
- API (server-side application)
- DB (the database)

### Packages

- doc (documentation)
- app (client-side application)
- api (server-side application)
- dat (data model)
- com (common validations, utils)

### Techs

- HTML/CSS/JS
- React
- React-Native
- Node
- Express
- Mongodb
- Mocha & Chai
- Typescript

### Data Model

User
- userId (Object-Id)
- name (string)
- email (string)
- username (string)
- password (string)
- role (string, enum: regular | moderator)

Profile
- profileId (Object_Id)
- name (string)
- topics/ interests (string)
- gender (string)
- languages ([string])
- age (number) optional
- profilePic (string) optional


Meet
- meetId(Object_Id)
- authorId(Object_Id)
- author's general interest/topics
- trending topics
- location ([number])
- startTime (Date)
- endTime (Date)
- address (string) optional
- placeName (string) optional
- review
    - rating (number, 1 to 5)
    - comment(string)

History
- meets ([meetId])
- locations([[number]])
- people([profileId])

Report
- authorId(ObjectId)
- targetId(ObjectId)
- issue(string, enum:)
- comment(string)

### Test Coverage