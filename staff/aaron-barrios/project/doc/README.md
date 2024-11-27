# [App Name]

## Intro

Being submerged in a delinquent lifestyle leads into being incarcerate.
In each process you are freed mysteriously; so you lead to meet your savior.
Despite a light ray approached the issue will not develop as you might think it will...

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExamRhOTZzYms5aHJ1cjZ0aHh5bGJiNTd0dmNkc3BlcWdtM2dkeHJqMiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/pUh8KWBxCjMeMI3S3y/giphy.gif)

## Functional

### Use Cases

User
- Select/Change Profile Picture
- Update user data
- Switch player avatar

Player
- Bi directional movement
- Starter Pokemon election
- 2d map view
- Battle view - gameplay
- Run 

Pokemon
- Life (decrease/increase)
- Moves (damage, uses)
- Level (string)


Checkpoint (column)
- Save game progress

God Mode 
- Teleport to exit 

Settings Menu
- Modify numerous options


### UXUI Design 

[Figma] (https://www.figma.com/design/eBTbrUTgZnrLmaxDIat8c9/final-project?node-id=0-1&node-type=canvas&t=fmFHkIcC2vLKwDL7-0)

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

### Data model

User - Anonymous(temporal)
- id(UUID)
- nickname (random string)

User - Registered
- id (UUID)
- name (string)
- nickname (string)
- password (string)

Profile - User
- profile Picture (image)
- Avatar (sprite-sheet)

Pokemon
- id (UUID)
- name (string)
- type (string)
- genre (string)
- life (number)
- level (number) ???
- moves ([{move}])
- sprites ([{sprite}])

sprites 
- backImageSprite (string)
- frontImageSprite (string)

move
- name (string)
- damage (number) 
- uses (number)

Settings
- Brightness (slider)
- General sound (slider)
- SFX (slider)
- music (slider)
- language (button)

### Techs 

- HTML/CSS/JS (...)
- React (...)
- Node (...)
- Express (...)
- MongoDB/SH (...)
- Mocha & Chai (...)
- [...]

### Test Coverage

[...]