# NAME TO BE DETERMINED
![](https://media1.tenor.com/m/v9LkJ4lmQDIAAAAd/beer-corona.gif)
## Intro

{name} es una app para encontrar a personas con que las charlar en ese tiempo libre entre trabajo, clases, aviones, trenes etc.. donde no tienes nada que hacer pero tampoco te puedes mover mucho de tu lugar.
El usuario podra crear un meet, que sera un punto en el mapa, indicando el lugar y tiempo donde se encuentra/estara. Los usuarios al abrir la app, podran ver una lista/un mapa con los meets, y se podran unir a el despues de abrir un chat y confirmar sitio y lugar con la persona creadora del meet.

## Functional Overview

### Use cases

#### User
- create profile
- add/ edit/ delete interest/ topics of chat
- add/ edit/ delete meet
- review/feedback about meet
- report if meet was not apropriate
- join meet
- search for meets with filters
- use maps to find and travel to meet
- chat

#### Moderator
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
- Typescript
- React
- React-Native
- Expo
- Node
- Express
- Bcrypt
- JWT
- Mongodb/Mongoose
- Mocha & Chai


### Data Model

User
- id (Object_Id)
- name (string)
- email (string)
- username (string)
- password (string)
- role (string, enum: regular | moderator)

Profile
- id (Object_Id)
- name (string)
- interests ([string])
- gender (string)
- languages ([string])
- age (number) optional
- profilePic (string) optional


Meet
- id (Object_Id)
- author (User.id)
- joinedId ([User.id])
- topics ([
    - interests ([string])
    - trending ([string]) optional
])
- location (coords[number, number])
- startTime (Date)
- endTime (Date)
- address (string) optional
- placeName (string) optional
- review
    - rating (number, 1 to 5)
    - comments ([string])

History
- id (Object_id)
- meets ([Meet.id])
- locations ([number, number])
- people ([Profile.id])

Report
- id (Object_id)
- author (ObjectId)
- targetId (ObjectId)
- issue (string, enum:)
- comment (string)

Chat
- id (Object_id)
- chattersId ([userId])
- messageId (Object_Id)
    - text (string)
    - sentDate (Date)
    - authorId (userId)



### Test Coverage