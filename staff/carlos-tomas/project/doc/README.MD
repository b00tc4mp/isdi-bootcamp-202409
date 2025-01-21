# [Care4Pets]

## Intro

La aplicación tendrá la función principal de poder visualizar los informes médicos que suban los veterinarios después de una revisión del animal. Se podrá visualizar los diferentes departamentos médicos como medicina interna, oftalmología, odontología...
El usuario podra ver los informes de sus mascotas.

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExamdqbXZudXg0NnUyaml1dDl2NG5vamF2bThiM3gxZjFtYnRycDc4byZlcD12MV9naWZzX3NlYXJjaCZjdD1n/FY8c5SKwiNf1EtZKGs/giphy.gif)

## Functional

### Use Cases

User
 - see your QR
 - be able to see any pet that is added to it
 - to be able to adjust the schedule. Vaccines, flea collar and pipette




Veterinary
- 


### UXUI Design

 [Figma](https://www.figma.com/design/MdMenDvnLaNrxePvxs9ZJY/Untitled?node-id=56-1612&node-type=frame&t=C8ujcCqD3h9GtuAz-0)

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
- phone (string, optional)
- pic (string, optional)
- role (string, enum: regular|veterinary)


Vaccine Selector 
- id(UUID)
- name (string)
- date (Date)
    
Deworm formulario 
- type (string, enum: external| internal | both )
- date (Date)

Pet
- id (UUID)
- owner (User.id)
- pic (string, optional)
- chip (string)
- name (string)
- race (string)
- sex (string)
- weight (number)
- sterilized (boolean)
- dateOfBirth(Date)
- vaccines ([Vaccine])
- deworms ([Deworm])

History
- id (UUID)
- type (string, enum: internal_medicine | ophthalmology | traumatology | dermatology)
- pet(Pet.id)
- veterinary (User.id)
- text (string)
- image (string, optional)  
- date(Date)
    
Next version

Appointment 
- id (UUID)
- type (string, enum: internal_medicine | ophthalmology | traumatology | dermatology)
- pet (Pet.id)
- veterinary (User.id)
- text (string, optional)
- date (Date)

### Techs

- CSS
-JavaScript
- React native:
    - Qrcode-svg
    - Singleton-Hook
    - Element-dropdown
- Expo
- Axios
- Node 
- Express
- Mongo, Mongoose
- Mocha & Chai

### Test Coverage

![](testUser.png)

![](testVete.png)

![](testCoverage.png)
