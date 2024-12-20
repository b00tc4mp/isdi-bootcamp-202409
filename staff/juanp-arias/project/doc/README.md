# Studify

## Intro
Studify is an application designed to help students and teachers to organise their academic life. It allows you to manage and edit notes, calendars, reminders and maintain efficient communication between users of the institution.

![alt text](Studify_logo_.png)

## Functional

### Use Cases

Student
- take notes and edit them
- synchronize notes to the calendar (1.0)
- search through notes (1.0)
- create alerts and reminders
- view and edit your schedule
- view assigned tasks
- track attendance
- view and edit your personal profile (name, e-mail, birthdate, password)
- view notifications

Teacher
- take notes and edit them
- synchronize notes to the calendar (1.0)
- search through notes (1.0)
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
- title (string)
- text (string, maxLength 200)

Task
- id (UUID)
- creator (User.id)
- assignes ([User.id])
- viewed ([User.id])
- date (Date)
- text (string, maxLength 400)


### Techs

- HTML/Tailwind CSS/JS 
- React 
- Node 
- Express 
- Mongo 
- Mongoose
- Mocha & Chai 
- jwt 
- bcrypt

### Test Coverage

```sh
  141 passing (3s)

-------------------------------|---------|----------|---------|---------|-------------------
File                           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------------------|---------|----------|---------|---------|-------------------
All files                      |   95.96 |    94.82 |   92.35 |   96.11 |                  
 groups                        |      96 |      100 |    92.4 |   95.86 |                  
  createGroup.js               |   84.61 |      100 |      60 |   83.33 | 11,16            
  createGroup.spec.js          |     100 |      100 |     100 |     100 |                  
  deleteGroup.js               |    87.5 |      100 |      60 |   84.61 | 10,17            
  deleteGroup.spec.js          |     100 |      100 |     100 |     100 |                  
  getGroups.js                 |   89.47 |      100 |   71.42 |   88.88 | 10,18            
  getGroups.spec.js            |     100 |      100 |     100 |     100 |                  
 home                          |   95.78 |      100 |    92.5 |   95.65 |                  
  getLastNote.js               |    87.5 |      100 |      60 |   85.71 | 10,16            
  getLastNote.spec.js          |     100 |      100 |     100 |     100 |                  
  getRemindersCount.js         |    92.3 |      100 |     100 |   91.66 | 14               
  getRemindersCount.spec.js    |     100 |      100 |     100 |     100 |                  
  getTasksCount.js             |   83.33 |      100 |      60 |   81.81 | 10,15            
  getTasksCount.spec.js        |     100 |      100 |     100 |     100 |                  
  getTasksCreatedCount.js      |   83.33 |      100 |      60 |   81.81 | 10,15            
  getTasksCreatedCount.spec.js |     100 |      100 |     100 |     100 |                  
 notes                         |   96.92 |      100 |   93.13 |   96.81 |                  
  createNote.js                |     100 |      100 |     100 |     100 |                  
  createNote.spec.js           |     100 |      100 |     100 |     100 |                  
  deleteNote.js                |    87.5 |      100 |      60 |   84.61 | 10,17            
  deleteNote.spec.js           |     100 |      100 |     100 |     100 |                  
  getNote.js                   |   94.11 |      100 |   66.66 |   93.33 | 14               
  getNote.spec.js              |     100 |      100 |     100 |     100 |                  
  getNotes.js                  |   88.88 |      100 |   66.66 |   88.23 | 10,18            
  getNotes.spec.js             |     100 |      100 |     100 |     100 |                  
  updateNote.js                |   83.33 |      100 |      50 |   81.81 | 11,16            
  updateNote.spec.js           |     100 |      100 |     100 |     100 |                  
 reminders                     |   96.18 |    91.66 |   93.54 |   96.76 |                  
  createReminder.js            |   86.36 |       75 |      60 |      90 | 21,26            
  createReminder.spec.js       |     100 |      100 |     100 |     100 |                  
  deleteReminder.js            |   89.47 |      100 |   66.66 |   88.23 | 13,19            
  deleteReminder.spec.js       |     100 |      100 |     100 |     100 |                  
  editReminder.js              |   93.33 |      100 |   66.66 |    92.3 | 13               
  editReminder.spec.js         |     100 |      100 |     100 |     100 |                  
  getReminders.js              |   92.85 |      100 |      75 |    92.3 | 9                
  getReminders.spec.js         |     100 |      100 |     100 |     100 |                  
  getRemindersByDate.js        |   95.23 |      100 |     100 |      95 | 15               
  getRemindersByDate.spec.js   |     100 |      100 |     100 |     100 |                  
  updateReminder.js            |   86.36 |    83.33 |   71.42 |      90 | 13,22            
  updateReminder.spec.js       |     100 |      100 |     100 |     100 |                  
 tasks                         |   94.63 |    88.46 |      90 |   94.77 |                  
  createTask.js                |   84.61 |    83.33 |    62.5 |   86.95 | 20,25,35         
  createTask.spec.js           |     100 |      100 |     100 |     100 |                  
  deleteTask.js                |    87.5 |      100 |      60 |   84.61 | 10,17            
  deleteTask.spec.js           |     100 |      100 |     100 |     100 |                  
  getTasks.js                  |      80 |       75 |   57.14 |   78.94 | 9,20     
  getTasks.spec.js             |     100 |      100 |     100 |     100 |                  
  getTasksCreated.js           |     100 |       75 |   57.14 |   77.77 | 9,18     
  getTasksCreated.spec.js      |     100 |      100 |     100 |     100 |                  
  toggleTaskViewed.js          |   88.23 |      100 |   66.66 |   85.71 | 13,22             
  toggleViewed.spec.js         |     100 |      100 |     100 |     100 |                  
 users                         |   96.52 |    95.45 |   93.24 |   96.77 |                  
  authenticateUser.js          |   90.47 |       75 |     100 |   94.73 | 20               
  authenticateUser.spec.js     |     100 |      100 |     100 |     100 |                  
  getUserDatos.js              |   93.75 |      100 |   66.66 |   92.85 | 14               
  getUserDatos.spec.js         |     100 |      100 |     100 |     100 |                  
  getUserName.js               |   94.11 |      100 |     100 |   93.33 | 15               
  getUserName.spec.js          |     100 |      100 |     100 |     100 |                  
  getUsers.js                  |   89.47 |      100 |   66.66 |   88.23 | 9,14             
  getUsers.spec.js             |     100 |      100 |     100 |     100 |                  
  registerUser.js              |      95 |      100 |     100 |   94.73 | 21               
  registerUser.spec.js         |     100 |      100 |     100 |     100 |                  
  updateUserData.js            |   86.66 |      100 |      50 |   84.61 | 13,22            
  updateUserData.spec.js       |     100 |      100 |     100 |     100 |                  
-------------------------------|---------|----------|---------|---------|-------------------
```