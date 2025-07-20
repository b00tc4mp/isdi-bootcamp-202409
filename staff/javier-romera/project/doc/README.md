# AllPiece

## Intro

AllPiece is the ultimate fan experience inspired by the One Piece universe. Dive into the adventure with interactive minigames and explore a detailed map of the East Blue, where you can travel between iconic islands. Whether you're battling through challenges or charting your journey across the seas, AllPiece brings the spirit of One Piece to life in an engaging and immersive way!

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

- HTML/TailwindCSS/JS/TS
- React
- Vite
- Node
- Express
- Mongo
- Mocha & Chai
- bcryptjs
- jwt

### Data Model

User
- id (ObjectId)
- email (string)
- username (string)
- password (string)
- role (string, enum: regular | anonymous)
- score (number)

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
- id (ObjectId)
- type (string, enum: equal | greater than equal | lower than equal)
- property (string)
- value (string | number | boolean)
- direction (string, enum: row | column)
- indexes ([number])
- text (string)

### Test Coverage

- el codigo está cubierto 👍

```sh
  85 passing (6s)

---------------------------------------|---------|----------|---------|---------|-------------------
File                                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
---------------------------------------|---------|----------|---------|---------|-------------------
All files                              |   94.52 |    80.62 |     100 |   94.52 |                   
 logic/characters                      |   94.49 |       75 |     100 |   94.49 |                   
  getAllCharacters.js                  |    87.5 |      100 |     100 |    87.5 | 12,20             
  getAllCharacters.spec.js             |     100 |      100 |     100 |     100 |                   
  getAllCharactersNameAndAlias.js      |   88.23 |      100 |     100 |   88.23 | 13,21             
  getAllCharactersNameAndAlias.spec.js |     100 |      100 |     100 |     100 |                   
  getCharacterByName.js                |   81.81 |       50 |     100 |   81.81 | 14-15,23-24       
  getCharacterByName.spec.js           |     100 |      100 |     100 |     100 |                   
  getCharactersByArc.js                |   85.71 |      100 |     100 |   85.71 | 14,22,28          
  getCharactersByArc.spec.js           |     100 |      100 |     100 |     100 |                   
  getRandomCharacter.js                |   88.23 |      100 |     100 |   88.23 | 12,20             
  getRandomCharacter.spec.js           |     100 |      100 |     100 |     100 |                   
 logic/conditions                      |   94.73 |      100 |     100 |   94.73 |                   
  getAllConditions.js                  |    87.5 |      100 |     100 |    87.5 | 12,20             
  getAllConditions.spec.js             |     100 |      100 |     100 |     100 |                   
 logic/users                           |   94.48 |    81.08 |     100 |   94.48 |                   
  authenticateUser.js                  |   82.14 |    66.66 |     100 |   82.14 | 15-16,25-26,35    
  authenticateUser.spec.js             |     100 |      100 |     100 |     100 |                   
  deleteAllAnonymousUsers.js           |    87.5 |      100 |     100 |    87.5 | 10                
  deleteAllAnonymousUsers.spec.js      |     100 |      100 |     100 |     100 |                   
  getRankingScores.js                  |   88.88 |      100 |     100 |   88.88 | 13,22             
  getRankingScores.spec.js             |     100 |      100 |     100 |     100 |                   
  getUserDetails.js                    |   86.95 |      100 |     100 |   86.95 | 13,21,29          
  getUserDetails.spec.js               |     100 |      100 |     100 |     100 |                   
  getUserStatus.js                     |   80.95 |       50 |     100 |   80.95 | 13-14,20-21       
  getUserStatus.spec.js                |     100 |      100 |     100 |     100 |                   
  getUserUsername.js                   |   94.44 |      100 |     100 |   94.44 | 15                
  getUserUsername.spec.js              |     100 |      100 |     100 |     100 |                   
  registerAnonymousUser.js             |   89.47 |      100 |     100 |   89.47 | 17,23             
  registerAnonymousUser.spec.js        |     100 |      100 |     100 |     100 |                   
  registerUser.js                      |   82.35 |    57.14 |     100 |   82.35 | 18-19,28,36-37,47 
  registerUser.spec.js                 |     100 |      100 |     100 |     100 |                   
  setNewUserStatus.js                  |   87.87 |    84.37 |     100 |   87.87 | 28-29,37-38       
  setNewUserStatus.spec.js             |     100 |      100 |     100 |     100 |                   
  updateUserProfile.js                 |    87.5 |    93.93 |     100 |    87.5 | 17,30,44,54,62,68 
  updateUserProfile.spec.js            |     100 |      100 |     100 |     100 |                   
  updateUserScore.js                   |   88.23 |      100 |     100 |   88.23 | 13,22             
  updateUserScore.spec.js              |     100 |      100 |     100 |     100 |                   
 util                                  |     100 |      100 |     100 |     100 |                   
  index.js                             |     100 |      100 |     100 |     100 |                   
  uuid.js                              |     100 |      100 |     100 |     100 |                   
---------------------------------------|---------|----------|---------|---------|-------------------
```