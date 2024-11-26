# [DanceApp!]

## Intro

DanceApp is an app designed to connect dancers and dance event organizers in your area. Whether you want to find a place to enjoy the rhythm or promote your next dance event, DanceApp is your ideal platform.

![](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWVud2RiaXF5eTZ5ejlobXRqZDZvYjF0ZWJuam40Nm1xMWZsNzYxciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/U5Ivkja8l6jsgdxtCb/giphy.gif)

## Functional

- Facilitate interaction between dancers and organizers, creating a community where users can:

- Find nearby dance events.
- Publish your own events (organizers only).
- Like, comment and share events.
- Connect with other dance enthusiasts.

### Use Cases

Dancer

- Search and explore events.
- Give "likes" to posts.
- Comment and participate in conversations.
- Share events with friends.

Organizer

- Search and explore events.
- Give "likes" to posts.
- Comment and participate in conversations.
- Share events with friends.
- Crear y administrar eventos.

### UXUI Design

[Figma](https://figma.com)

## Technical

### Blocks

- App: The mobile application developed in React Native.
- API: Backend to manage requests and business logic.
- DB: MongoDB database to store users, events, and roles.

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
  - date (Date)}])

### Techs

- Frontend: React Native
- Backend: Node.js + Express
- Database: MongoDB
- Style: CSS for React Native (Styled Components and StyleSheet)
- Authentication: JWT

### Test Coverage
