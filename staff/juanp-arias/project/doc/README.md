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
-------------------------------|---------|----------|---------|---------|-------------------
File                           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------------------|---------|----------|---------|---------|-------------------
All files                      |   97.45 |       85 |    97.8 |   97.49 |                  
 groups                        |   96.73 |    92.85 |    92.3 |   96.59 |                  
  createGroup.js               |   83.33 |      100 |      60 |   81.81 | 10,15            
  createGroup.spec.js          |     100 |      100 |     100 |     100 |                  
  deleteGroup.js               |    87.5 |      100 |      60 |   84.61 | 10,17            
  deleteGroup.spec.js          |     100 |      100 |     100 |     100 |                  
  getGroups.js                 |      95 |    83.33 |     100 |   94.44 | 36               
  getGroups.spec.js            |     100 |      100 |    87.5 |     100 |                  
 home                          |   97.63 |    83.33 |     100 |   97.53 |                  
  getLastNote.js               |   94.11 |    83.33 |     100 |   93.33 | 26               
  getLastNote.spec.js          |     100 |      100 |     100 |     100 |                  
  getRemindersCount.js         |    92.3 |      100 |     100 |   91.66 | 12               
  getRemindersCount.spec.js    |     100 |      100 |     100 |     100 |                  
  getTasksCount.js             |    92.3 |       75 |     100 |    90.9 | 19               
  getTasksCount.spec.js        |     100 |      100 |     100 |     100 |                  
  getTasksCreatedCount.js      |    92.3 |       75 |     100 |    90.9 | 19               
  getTasksCreatedCount.spec.js |     100 |      100 |     100 |     100 |                  
 notes                         |    97.4 |     92.3 |   96.03 |   97.28 |                  
  createNote.js                |     100 |      100 |     100 |     100 |                  
  createNote.spec.js           |     100 |      100 |     100 |     100 |                  
  deleteNote.js                |    87.5 |      100 |      60 |   84.61 | 10,17            
  deleteNote.spec.js           |     100 |      100 |     100 |     100 |                  
  getNote.js                   |   94.73 |       90 |     100 |   93.75 | 27               
  getNote.spec.js              |     100 |      100 |     100 |     100 |                  
  getNotes.js                  |   94.73 |    83.33 |     100 |   94.11 | 31               
  getNotes.spec.js             |     100 |      100 |     100 |     100 |                  
  updateNote.js                |   83.33 |      100 |      50 |   81.81 | 11,17            
  updateNote.spec.js           |     100 |      100 |     100 |     100 |                  
 reminders                     |   97.26 |    76.47 |     100 |   97.49 |                  
  createReminder.js            |    91.3 |    66.66 |     100 |   90.47 | 19,34             
  createReminder.spec.js       |     100 |      100 |     100 |     100 |                  
  deleteReminder.js            |   93.75 |    83.33 |     100 |    92.3 | 29               
  deleteReminder.spec.js       |     100 |      100 |     100 |     100 |                  
  editReminder.js              |   94.11 |    83.33 |     100 |   92.85 | 24               
  editReminder.spec.js         |     100 |      100 |     100 |     100 |                  
  getReminders.js              |   93.75 |       75 |     100 |   92.85 | 23               
  getReminders.spec.js         |     100 |      100 |     100 |     100 |                  
  getRemindersByDate.js        |   95.23 |      100 |     100 |      95 | 14               
  getRemindersByDate.spec.js   |     100 |      100 |     100 |     100 |                  
  updateReminder.js            |    91.3 |       70 |     100 |      95 | 38               
  updateReminder.spec.js       |     100 |      100 |     100 |     100 |                  
 tasks                         |   97.81 |    79.16 |      98 |   97.71 |                  
  createTask.js                |      95 |       75 |     100 |   94.11 | 29               
  createTask.spec.js           |     100 |      100 |     100 |     100 |                  
  deleteTask.js                |    87.5 |      100 |      60 |   84.61 | 10,17            
  deleteTask.spec.js           |     100 |      100 |     100 |     100 |                  
  getTasks.js                  |   94.11 |    66.66 |     100 |   93.33 | 27               
  getTasks.spec.js             |     100 |      100 |     100 |     100 |                  
  getTasksCreated.js           |   94.11 |       75 |     100 |   93.33 | 27               
  getTasksCreated.spec.js      |     100 |      100 |     100 |     100 |                  
 users                         |   97.68 |    91.66 |     100 |   97.97 |                  
  authenticateUser.js          |   90.47 |       75 |     100 |   94.73 | 20               
  authenticateUser.spec.js     |     100 |      100 |     100 |     100 |                  
  getUserDatos.js              |   94.11 |      100 |     100 |   93.33 | 15               
  getUserDatos.spec.js         |     100 |      100 |     100 |     100 |                  
  getUserName.js               |   94.11 |      100 |     100 |   93.33 | 15               
  getUserName.spec.js          |     100 |      100 |     100 |     100 |                  
  getUsers.js                  |     100 |      100 |     100 |     100 |                  
  getUsers.spec.js             |     100 |      100 |     100 |     100 |                  
  registerUser.js              |      95 |      100 |     100 |   94.73 | 21               
  registerUser.spec.js         |     100 |      100 |     100 |     100 |                  
  updateUserData.js            |   93.75 |       75 |     100 |    92.3 | 24               
  updateUserData.spec.js       |     100 |      100 |     100 |     100 |                  
-------------------------------|---------|----------|---------|---------|-------------------
```