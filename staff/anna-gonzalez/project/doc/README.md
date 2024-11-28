# Period (Syncly pa los amigos)

<!-- preguntar si necesito un rol para el partner -->

## Intro

This app is designed for menstruating people to be your **everyday companion** to stay organized and in control.

Whether you want to **keep track of symptoms**, set **reminders** for important dates, or discover **tips and music** for each phase of your cycle, Period adapts to your needs and helps you **sync with your body**.

It’s more than just tracking—it’s about **embracing your rhythm** and thriving every day of the month.

![](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcno0Z21nOWxudXRiNXhlajY3dWF5eDBwM3Vjdm9xMnhzaThtcDZtdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j10NjRC0rU0IrIIbaA/giphy.gif)

## Functional

### Use Cases

User
- create/update/delete period start and end dates to calendar
- create/update/delete a log of daily symptoms and activities
- create/delete & read reminders
- read data about your current cycle
- read reports of the last cycles    
- read predictions for the next cycle in the calendar
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

Cycle
- id (ObjectId)
- user (User.id)
- start (Date)
- end (Date, optional)
- periodEnd (Date)
- dailyLogs ([DailyLog.id])

DailyLog
- id (ObjectId)
- cycle (Cycle.id)
- date (Date)
- symptoms (string, enum: 0 (fatigue) | 1 (headache) | 2 (cramps) | 3 (tender breasts) | 4 (acne) | 5 (backache) | 6 (cravings) | 7 (abdominal pain) | 8 (dryness))
- mood (string, enum: 0 (calm) | 1 (happy) | 2 (mood swings) | 3 (sad) | 4 (anxious))
- energy (string, enum: 0 (low) | 1 (medium) | 2 (high))
- flow (string, enum: 0 (no discharge) | 1 (creamy) | 2 (watery))
- sleep (string, enum: 0 (poor) | 1 (average) | 2 (good))
- sexualActivity (string, enum: 0 (didn't have sex) | 1 (had sex))
- sexualEnergy (string, enum: 0 (low) | 1 (medium) | 2 (high))

Reminder
- id (ObjectId)
- user (User.id)
- date (Date)
- title (string)

Tip
- id (ObjectId) 
- date (Date)
- phase (string, enum: 1 (menstruation) | 2 (follicular) | 2 (ovulation) | 4 (luteal))
- category (string, enum: 1 (nutrition) | 2 (exercise) | 3 (self-care) | 4 (music))
- description (string)

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