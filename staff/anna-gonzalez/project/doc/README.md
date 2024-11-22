# Period (Syncly pa los amigos)

## Intro

An app designed for **menstruating people** to simplify your daily life by tracking your menstrual cycle, organizing important events, and providing personalized insights on key aspects of your routine.

This app is your **everyday companion** to stay organized and in control. Whether you want to keep track of symptoms, set reminders for important dates, or discover tips and music for each phase of your cycle, Period adapts to your needs and helps you **sync with your body**.

With a clean and intuitive design, Period **empowers you** to better understand your body and make informed decisions about your health and wellness. It’s more than just tracking—it’s about **embracing your rhythm** and thriving every day of the month.

![](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcno0Z21nOWxudXRiNXhlajY3dWF5eDBwM3Vjdm9xMnhzaThtcDZtdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j10NjRC0rU0IrIIbaA/giphy.gif)

## Functional

### Use Cases

User
- create/update/delete period start and end dates to calendar
- create/update/delete events with or without reminder to calendar
- create/update/delete a note to the home
- create/update/delete a log of daily symptoms
- read data about your current cycle
- read events reminders and notes
- read reports of the last cycles
- read predictions for the next cycle
- read user profile
- read tips regarding your week of the cycle
- read 3 new artists that change every week

Visitor
- read home

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

Hacer componente viewer para q vea un resumen d los detalles

User
- id (ObjectId)
- name (string)
- email (string, unique)
<!-- - birth date (date) 
- username (string, unique) -->
- password (hashed string)

Cycles
- id (unique identifier)
- user (User.id)
- startDate (date)
- endDate (date) OPTIONAL!!!!
- cycleDays: (number: //endDate - startDate) 
- menstruationDays (number)
- isRegular (boolean)
- mostFrequentSymptoms ([Symptom.id])
<!-- - flowIntensity (string, enum: light | medium | heavy)
- energyLevel (string, enum: low | medium | high)
- slepQuality (string, enum: poor | average | good)
- sexualActivity (number) optionallllllll-->
- summary (string)

Symptom
- id (unique identifier)
- name (string)
- image (string)
- category (string, enum: physical | emotional)

Event
- id (unique identifier)
- user (User.id)
- date (Date)
- title (string)
- description (string)
- reminder (boolean)

Tip
- id (unique identifier)
- phase (string, enum: menstruation | follicular | ovulation | luteal)
- category (string, enum: nutrition | exercise | self-care | music)
- description (string)

<!-- DailyInsight
- id (unique identifier)
- userId (reference to user.id)
- date (date)
- phase (string, enum: menstruation | follicular | ovulation | luteal)
- symptoms (array of references to Symptom.id)
- pregnancyChance (string, enum: low | medium | high)
- reminder (string)
- note (string)

Report
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