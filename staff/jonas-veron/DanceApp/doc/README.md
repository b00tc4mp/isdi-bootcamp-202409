# [DanceApp!]

## Intro

DanceApp is an app designed to connect dancers and dance event organizers in your area. Whether you want to find a place to enjoy the rhythm or promote your next dance event, DanceApp is your ideal platform.

![](https://i.gifer.com/xz.gif)

## Functional

- Facilitate interaction between dancers and organizers, creating a community where users can:

- Find nearby dance events.
- Publish your own events (organizers only).
- Like, comment and share events.
- Connect with other dance enthusiasts.

### Use Cases

Dancer

- Search and explore events with filters by location.
- Give "likes" to posts.
- Comments.
- Share events with friends.

Organizer

- Search and explore events with filters by location.
- Give "likes" to posts.
- Comments.
- Share events with friends.
- Create and manage events.
- Profile with your posts

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

User:

- id (UUID)
- name (string)
- email (string)
- password (string)
- role (string): Role of the user (dancer | organizer | moderator)
- permission(string, enum: read | write)
- favorites [events]
- createdAt (Date)

Event:

- id (UUID)
- author (User.id)
- image (string)
- text (string)
- date (Date)
- likes ([User.id])
- location (Location)

Comment:

- id (UUID)
- author (User.id)
- text (string maxLength 200)
- date (Date)


Location

- id (UUID)
- type (string, point )
- coordinates ([Number])


### Techs

- Frontend: React, HTML, CSS, JavaScript, TailwindCSS
- Backend: Node.js + Express
- Database: MongoDB
- Authentication: JWT
- Testing: Mocha & Chai (for backend logic)
- Map Integration: Leaflet.js

### Test Coverage
