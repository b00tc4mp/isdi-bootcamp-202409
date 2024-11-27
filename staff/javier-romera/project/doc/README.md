# AllPiece

## Intro

[...] jueguito de wanpi

balbanegla te voa desglanal

![](https://media.giphy.com/media/UTek0q3N8osh8agH4Y/giphy.gif?cid=ecf05e47hxd5z63sxe9b828ydc8k1zu2gywzryo0palmjq52&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional

### Use Cases

Regular (User)
- play the guessing minigame
- play the sudoku minigame
- access to the map and progress through it
- access to the score and ranking system

Anonymous (User)
- play the guessing minigame (limited daily)
- play the sudoku minigame (limited daily)
- access to the map (without progress, only can access the first island)

### UXUI Design

[Figma](https://www.figma.com/proto/WdfN0Bhl9UcAXnvUwuotVD/AllPiece?node-id=1-2&node-type=frame&t=EyAbcwRMjbLGnUQB-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2)

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

### Techs

- HTML/TailwindCSS/JS (...)
- React (...)
- Vite (...)
- Node (...)
- Express (...)
- Mongo (...)
- Mocha & Chai (...)

### Data Model

User
- id (ObjectId)
- name (string)
- email (string)
- username (string)
- password (string)
- role (string, enum: regular | anonymous)
- score (number)
- rank (string, enum: ...)

Devilfruit
- id (ObjectId)
- name (string)
- type (string)
- description (string)

Arc
- id (ObjectId)
- name (string)
- number (number)

Character
- id (ObjectId)
- name (string)
- alias (string)
- gender (string)
- affiliation (string)
- race (string)
- devilfruit (Devilfruit.id, optional)
- bounty (bigint)
- height (number)
- firstArc (Arc.id)
- description (string)
- armament (boolean)
- conqueror (boolean)
- observation (boolean)
- sea (string)
- town (string)

Condition
- id (ObjectId) <!-- el id -->
- type (string, enum: equal | greater than equal | lower than equal) <!-- para poder hacer la comparación -->
- property (string) <!-- que propiedad queremos comparar -->
- value (any) <!-- el valor de la propiedad que queremos comparar -->
- direction (string, enum: row | column) <!-- la direccion de la condición para evitar exclusiones -->
- index (number) <!-- el indice en el que estara la condición en el tablero -->
- text (string) <!-- el texto que se imprimirá por pantalla en el minijuego para decirle la condicion al usuario -->

### Test Coverage

- el codigo está cubierto 👍