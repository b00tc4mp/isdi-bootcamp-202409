# [App Name] //pending

## Intro

[...]

![](https://e7.pngegg.com/pngimages/220/720/png-clipart-paper-post-it-note-product-design-logo-design-text-logo.png)

## Functional

### Use Cases

User (student)
- Take notes
- Grade Checking
- Access to Assignments and Projects
- School Calendar
- Communication with Teachers (future)
- Attendance Record 
- Personal Profile
- [...]

Admin (Teacher/Center)
- Grade Management
- Assignment Creation
- Attendance Tracking
- Communication with Students (future)
- [...]

### UXUI Design

[Figma](https://figma.com)

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
- grade (string)

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