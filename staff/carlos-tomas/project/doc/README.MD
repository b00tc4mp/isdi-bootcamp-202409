# [Care4Pets]

## Intro

La aplicación tendrá la función principal de poder visualizar los informes médicos que suban los veterinarios después de una revisión del animal. Se podrá visualizar los diferentes departamentos médicos como medicina interna, oftalmología, odontología...
También tendrá un calendario donde se podrá visualizar las citas médicas y hacer un seguimiento de las vacunas, collar antipulgas y pipeta.
Los informes médicos serán subidos por los veterinarios a partir de la identificación del chip del animal y será vinculado por el veterinario al usuario a partir de un QR.

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

[Figma](https://www.figma.com/proto/MdMenDvnLaNrxePvxs9ZJY/Untitled?node-id=4-3&starting-point-node-id=4%3A3)      [Figma2](https://www.figma.com/design/MdMenDvnLaNrxePvxs9ZJY/Untitled?node-id=56-1612&node-type=frame&t=C8ujcCqD3h9GtuAz-0)

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
- pets{Pet.id}



Veterinary
- id(UUID)
- name (string)
- mail (string)
- username(string)
- password (string)
- roll (string, emum: internal_medicine | ophthalmology | traumatology | dermatology)



Pet
- id (UUID)
- chip (string, QR)
- name (string)
- age (number)
- race (string)
- sex (string)
- weigth (number)
- sterilized (booleano)
- date of birth(Date)
- vaccine([{
    - name (string)
    - date (Date)
}])
- pipete([{
    - name (string)
    - date (Date)
}])
- flear collar([{
    - name (string)
    - date (Date)
}])



History
- internal_medicine([{
    - pet(Pet_id)
    - veterinary {Veterinary.id}
    - text (string)
    - image (string) opcional 
    - date(Date)
    }])
 - ophthalmology([{
    - pet(Pet_id)
    - veterinary {Veterinary.id}
    - text (string)
    - image (string) opcional 
    - date(Date)
   }])
 - traumatology([{
    - pet(Pet_id)
    - veterinary {Veterinary.id}
    - text (string)
    - image (string) opcional 
    - date(Date)
    }])
 - dermatology([{
    - pet(Pet_id)
    - veterinary {Veterinary.id}
    - text (string)
    - image (string) opcional 
    - date(Date)
 }])

new appointment 
- internal_medicine([{
    - veterinary (Veterinary.id)
    - pet (Pet.id)
    - Date (dates)
}])
- ophthalmology([{
    - veterinary (Veterinary.id)
    - pet (Pet.id)
    - Date (dates)
}])
- traumatology([{
    - veterinary (Veterinary.id)
    - pet (Pet.id)
    - Date (dates)
}])
- dermatology([{
    - veterinary (Veterinary.id)
    - pet (Pet.id)
    - Date (dates)
}])

### Techs

- HTML/CSS/JS (...)
- React native (...)
- Node (...)
- Express (...)
- Mongo, Mongoose(...)
- Mocha & Chai (...)
- 

### Test Coverage

[...]