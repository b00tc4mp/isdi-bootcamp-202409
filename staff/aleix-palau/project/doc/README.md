# Heartbeat (maybe?)

## Intro

If music is your world and you're seeking others who resonate with your taste, Heartbeat is the ultimate app for bringing music lovers together for friendship or perhaps something deeper.

![](https://i.redd.it/6n7yqum9b9jc1.jpeg)

## Functional

### Use Cases

- edit own profile:
    - update bio
    - update profile pictures
    - update music preferences
- link Spotify account to profile
- view profiles
- filter profiles based on:
    - favourite genres or artists
    - age
    - location/distance
- **Heartbeat** left/right on someone who makes your heart skip a beat
- chat with people you match with
- display recently played tracks on chats
- share music in chats
<!-- - option to join concerts in calendar
- invite people to concerts -->
- get notifications when:
    - you match with someone
    - you receive a message
    <!-- - a band you follow comes to your city
    - someone invites you to a concert -->

### UXUI Design

[Figma](https://figma.com)

## Technical

### Blocks

- App (client-side application)
- API (server-side API)
- DB (database)

### Packages

- doc (documentation)
- app (client-side application)
- api (server-side API)
- dat (data model and driver)
- com (common validations, utils, ...)

### Techs

- HTML/CSS/JS
- React
- React Native (?)
- Node
- Express
- Mongo
- Mocha & Chai

### Data Model

User
- id (ObjectId)
- name (string)
- email (string, unique)
- password (string, hashed)
- dateOfBirth (Date)
- gender (string, enum: man | woman | nonbinary)
- targetGender ([string], enum: men | women | nonbinary people)
- coordinates ([ latitude: float, longitude: float ])

- bio (string, optional)
- pictures ([string])
- minAge (integer, optional)
- maxAge (integer, optional)
- distance (integer, optional)
<!-- - genres ([string]) -->
- artists ([string])
- spotifyId (string, optional, unique)
- spotifyAccessToken (string)
- spotifyRefreshToken (string)

- spotifyTrackId (string)
- track (string)
- artist (string)
- playedOn (Date)
- setupStage (string, enum: ...)

Heartbeat
- id (ObjectId)
- sender (User.id)
- receiver (User.id)
- action (string, enum: left | right)
- date (Date)

Match
- id (ObjectId)
- users ([User.id])
- messages ([Message])

Message
- id (ObjectId)
- author (User.id)
- content (string)
- date (Date)
- type (string, enum: text | music)
- music (Music, optional)

Music
- id (ObjectId)
- sharedBy (User.id)
- spotifyTrack (string)
- track (string)
- artist (string)
- date (Date)

Notification
- id (ObjectId)
- from (User.id)
- to (User.id)
- type (string, enum: match | message | event)
- date (Date)

<!-- Event
- id (ObjectId)
- name (string)
- artist (string)
- venue (string)
- city (string)
- date (Date)
- createdAt (Date)
- interested ([User.id])
- going ([User.id])

Invite
- id (ObjectId)
- event (Event.id)
- from (User.id)
- to (User.id)
- date (Date)
- status (string, enum: pending | accepted | declined) -->

### Test Coverage

[...]