# Studify

## Intro
Studify is an application designed to help students and teachers to organise their academic life. It allows you to manage and edit notes, calendars, reminders and maintain efficient communication between users of the institution.

![alt text](Studify_logo_.png)

## Functional

### Use Cases

Student
- take notes and edit them
- synchronize notes to the calendar
- search through notes
- create alerts and reminders
- view and edit your schedule
- view assigned tasks
- track attendance
- view and edit your personal profile (name, e-mail, birthdate, password)
- view notifications

Teacher
- take notes and edit them
- synchronize notes to the calendar
- search through notes
- create alerts and reminders
- view and edit your schedule
- assign tasks to students
- track student attendance
- create student groups
- view and edit your personal profile (name, e-mail, birthdate, password)
- view notifications


### UXUI Design
[Figma](https://www.figma.com/proto/x7oiMpA4G1hKMu6RwslWb8/Studify?node-id=1-1742&node-type=canvas&t=vTuePcD21zr1HVWI-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A1742)

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
- dateOfBirth(Date)
- password (string, minLength 6)
- role (string, enum: teacher | student)
- notes ([Note])
- reminders ([Reminder])

Group
- id (UUID)
- name (string)
- teacher (User.id)
- students ([User.id])

Note
- id (UUID)
- date (Date)
- text (string, maxLength 400)

Reminder
- id (UUID)
- date (Date)
- text (string, maxLength 200)

Task
- id (UUID)
- creator (User.id)
- assignes ([User.id])
- date (Date)
- text (string, maxLength 400)


### Techs

- HTML/CSS/JS (...)
- React (...)
- Node (...)
- Express (...)
- Mongo (...)
- Mocha & Chai (...)
- [...]

### Test Coverage

```sh
----------------------|---------|----------|---------|---------|-------------------
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line 
----------------------|---------|----------|---------|---------|-------------------
All files             |   96.96 |       50 |     100 |   96.87 |                   
 registerUser.js      |    92.3 |       50 |     100 |   91.66 | 23                
 registerUser.spec.js |     100 |      100 |     100 |     100 |                   
----------------------|---------|----------|---------|---------|-------------------
```