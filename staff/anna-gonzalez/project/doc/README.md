# Period (Syncly pa los amigos)

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
- record notes
- view a history of past cycles and events
- receive reminder notifications
- view reports

Visitor
- view calendar
- record notes

### UXUI Design

[Figma](https://www.figma.com/proto/0axquRKAMeYzYictpTqeQX/A-punto?node-id=0-1&t=5XWGSFzZZMcMrNle-1)

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

### Data Model

User
- id (ObjectId)
- name (string)
- email (string, unique)
- birth date (date)
- username (string, unique)
- password (hashed string)

Cycle
- id (unique identifier)
- userId (reference to user.id)
- startDate (date)
- endDate (date)
- cycleLength: (number: endDate - startDate)
- menstruationLength (number)
- ovulationDate (number)
- flowIntensity (string, enum: light | medium | heavy)
- isRegular (boolean)
- symptoms (array of references to symptom.id)
- energyLevel (object with sleep and physical)
- sexualActivity (number)
- notes (string)

Symptom
- id (unique identifier)
- name (string)
- image (string)
- category (string, enum: physical | emotional)

DailyInsight
- id (unique identifier)
- userId (reference to user.id)
- date (date)
- phase (string, enum: menstruation | follicular | ovulation | luteal)
- symptoms (array of references to Symptom.id)
- pregnancyChance (string, enum: low | medium | high)
- reminder (string)
- note (string)

Event
- id (unique identifier)
- userId (reference to user.id)
- date (date)
- title (string)
- text (string)
- reminder (boolean)

Tip
- id (unique identifier)
- phase (string, enum: menstruation | follicular | ovulation | luteal)
- category (string, enum: nutrition | activities | well-being | music)
- text (string)

<!-- Report
- id (unique identifier)
- userId (reference to user.id)
- cycleId (reference to cycle.id)
- cycleLength (number)
- menstruationLength (number)
- mostFrequentSymptoms (array of references to symptom.id)
- isRegular (boolean)

Statistics
- userId (reference to user.id)
- averageCycleLength (number)
- averageMenstruationLength (number)
- mostFrequentSymptom (reference to symptom.id)
- isRegularPercentage (number) -->


### Techs

- HTML/CSS/JS (...)
- React (...)
- Node (...)
- Express (...)
- Mongo (data base)
- Mocha & Chai (testing)
- [...]

### Test Coverage

[...]