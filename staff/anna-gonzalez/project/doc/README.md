# Period || YouRule || Syncly || Rely || Flowa

## Intro

An app designed for menstruating people to simplify your daily life by tracking your menstrual cycle, organizing important events, and providing personalized insights on key aspects of your routine.

This app is your everyday companion to stay organized and in control.

![](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcno0Z21nOWxudXRiNXhlajY3dWF5eDBwM3Vjdm9xMnhzaThtcDZtdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j10NjRC0rU0IrIIbaA/giphy.gif)

## Functional

### Use Cases

User
- add period start and end dates to calendar
- view predictions for next cycle
- add custom events w or without reminder to calendar
- set reminders
- record notes or journal entries
- view a history of past cycles and events
- receive reminder notifications
- edit profile
- view reports

Visitor
- view calendar
- record notes or journal entries

### UXUI Design

[Figma](https://www.figma.com/proto/0axquRKAMeYzYictpTqeQX/A-punto?node-id=0-1&t=5XWGSFzZZMcMrNle-1)

## Technical

### Blocks

- App (the client-side application)
- API (the server-side API)
- DB (the database)

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
    - date (Date) }])

### Techs

- HTML/CSS/JS (...)
- React (...)
- Node (...)
- Express (...)
- Mongo (...)
- Mocha & Chai (...)
- [...]

### Test Coverage

[...]