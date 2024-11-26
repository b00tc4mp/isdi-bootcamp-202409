# Heartbeat (WIP)

## Intro

If music is your world and you're seeking others who resonate with your taste, Heartbeat is the ultimate app for bringing music lovers together for friendship or perhaps something deeper.

![](https://i.redd.it/6n7yqum9b9jc1.jpeg)

## Functional

### Use Cases

#### Free (User)
- edit own profile:
    - update bio
    - update profile pictures
    - update music preferences
- link Spotify account to profile
- view profiles
- filter profiles based on:
    - favorite genres or artists
    - age
    - location/distance
- swipe left/right on profiles
- **Heartbeat** someone who makes your heart skip a beat
- report profiles
- chat with people you matched with
- display recently played tracks on the chat
- share music in chats
- option to join concerts in calendar
- invite people to concerts
- receive alerts when:
    - someone you previously liked likes you back
    - a band you follow comes to your city
    - someone invites you to a concert

#### Pro (User)
Contains all **Free** features and...
- option to view who liked you and decide whether to connect
- **Heartbeat** unlimited people per day

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

- HTML/CSS/JS (...)
- React (...)
- Node (...)
- Express (...)
- Mongo (...)
- Mocha & Chai (...)
- React Native (???)
- [...]

### Data Model

User
- id (ObjectId)
- first name (string)
- email (string)
- password (string)
- dob (date)
- gender (string, enum: male | female | nonbinary)
- target (string, enum: male | female | nonbinary)
- location (string)
- role (string, enum: free | pro)

Home
-

Profile
- 

Chat
-

Events
-

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

### Test Coverage

[...]