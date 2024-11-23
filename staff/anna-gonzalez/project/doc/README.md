# Period (Syncly pa los amigos)

## Intro

This app is designed for menstruating people to be your **everyday companion** to stay organized and in control. Whether you want to keep track of symptoms, set reminders for important dates, or discover tips and music for each phase of your cycle, Period adapts to your needs and helps you **sync with your body**.

With a clean and intuitive design, Period **empowers you** to better understand your body and make informed decisions about your health and wellness. It’s more than just tracking—it’s about **embracing your rhythm** and thriving every day of the month.

![](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcno0Z21nOWxudXRiNXhlajY3dWF5eDBwM3Vjdm9xMnhzaThtcDZtdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j10NjRC0rU0IrIIbaA/giphy.gif)

## Functional

### Use Cases

User
- create/update/delete period start and end dates to calendar
- create/update/delete events with or without reminder to calendar
- create/update/delete a log of daily symptoms and activities
- read data about your current cycle
- read events reminders
- read reports of the last cycles    
- read predictions for the next cycle
- read user profile
- read tips regarding your week of the cycle

Visitor
- read home

### UXUI Design

[Figma](https://www.figma.com/design/0axquRKAMeYzYictpTqeQX/Period?node-id=0-1&t=9KYWTC76WtFOT8jc-1)

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
- password (hashed string)

Cycles
- id (ObjectId)
- user (User.id)
- periodStart (Date)
- periodEnd (Date)
- cycleEnd (Date)
- isRegular (boolean)
- dailyLogs: ([DailyLog.id])

DailyLog
- id (ObjectId)
- cycle (Cycles.id)
- date (Date)
- flowIntensity (string, enum: light | medium | heavy)
- energyLevel (string, enum: low | medium | high)
- sleepQuality (string, enum: poor | average | good)
- sexualActivity (number)
- symptoms ([Symptom.id])

Symptom
- id (ObjectId)
- name (string)
<!-- - image (string) -->
- category (string, enum: physical | emotional)
- severity (string, enum: mild | moderate | severe)

Event
- id (ObjectId)
- user (User.id)
- date (Date)
- title (string)
- description (string)
- reminder (boolean)
- recurrence ({ type (string), interval (number)})

Tip
- id (ObjectId)
- phase (string, enum: menstruation | follicular | ovulation | luteal)
- category (string, enum: nutrition | exercise | self-care | music)
- description (string)

<!-- DailyInsight
- id (ObjectId)
- userId (reference to user.id)
- date (date)
- phase (string, enum: menstruation | follicular | ovulation | luteal)
- symptoms (array of references to Symptom.id)
- pregnancyChance (string, enum: low | medium | high)
- reminder (string)
- note (string)

Report
- id (ObjectId)
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