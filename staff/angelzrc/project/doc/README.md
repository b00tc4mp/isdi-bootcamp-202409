# NAME TO BE DETERMINED
![](https://media1.tenor.com/m/v9LkJ4lmQDIAAAAd/beer-corona.gif)
## Intro

{name} es una aplicación diseñada para encontrar personas con quienes charlar durante ese tiempo libre entre trabajo, clases, vuelos, viajes en tren, etc., cuando no tienes nada que hacer, pero tampoco puedes moverte mucho de tu lugar.

El usuario podrá crear un meet, que será un punto en el mapa, indicando el lugar y el tiempo en que se encuentra o estará. Los usuarios, al abrir la aplicación, podrán ver una lista o un mapa con los meets disponibles y podrán unirse a ellos después de abrir un chat y confirmar el sitio y la hora con la persona que creó el meet.



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

Review
- id (Object_Id)
- auhtor (User.id)
- meet (Meet.id)
- rating (number, 1 to 5)
- comment (string)

History
- id (Object_id)
- meets ([Meet.id])
- locations ([number, number])
- people ([Profile.id])

Report
- id (Object_id)
- author (User.id)
- target (User.id)
- issue (string, enum: No show | Inappropriate | Fake | Scam)
- comment (string)

Chat
- id (Object_id)
- chattersId ([User.id])
- messages ([Object_Id])
    - id (Object_Id)
    - text (string)
    - sentDate (Date)
    - author (User.id)


### Test Coverage