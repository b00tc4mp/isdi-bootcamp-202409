
## Intro
Legend of the cursed kingdom es un rpg no lineal, en el que escribes tu propia historia sin limitarte a seguir un camino prefijado. Explora un amplio mundo abierto con 5 biomas únicos, todo cuánto hagas tendrá su repercusión en el mundo, con la economía orientada al jugador de LCK, los jugadores crean prácticamente todo el equipo a partir de los recursos que consiguen, el equipo que llevas define quién eres, cambia de arma y armadura para pasar de caballero a mago, o juega como una mezcla de ambas clases. Aventúrate en el mundo abierto frente a los habitantes y las criaturas de LCK, inicia expediciones o adéntrate en mazmorras en las que encontrarás enemigos aún más difíciles, enfréntate a otros jugadores en encuentros en el mundo abierto, lucha por los territorios o por ciudades enteras en batallas tácticas, relájate en tu isla privada, donde podrás construir un hogar, cultivar cosechas y criar animales, únete a un gremio, todo es mejor cuando se trabaja en grupo. Adéntrate ya en el mundo de LCK y escribe tu propia historia.

![](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmQ1czVzbDE3ZWljbTR6ZTN3cmE0a3NzdmIzYm8zYWF0N25reW5jZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1yld7nW3oQ2IyRubUm/giphy.webp)
## Functional

### Use Cases
Player
- Begin a new adventure
- Continue a saved adventure
- Play multiplayer?
- Choose up to 4 playable heroes
- Buy items from store
- Use items in battle
- Choose new skills from level up
- Manage party inventory
- And overall have fun and play

Admin
- Manage enemies statistics
- Grant access to blocked quests 
- Manage users
- Manage items

### UXUI Design
[Figma](https://www.figma.com/design/nFK7TilzcbyfJ9GPjadQCu/Posible-proyecto?node-id=0-1&t=Xy6rfTAPHVU0dcFh-1)
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
Player
- id (ObjectId)
- name (string)
- email (string)
- username (string)
- password (string)
- gamesState [GameState.id]
- settings (Settings)

Settings 
- id (ObjectId)
- music (number)
- brightness (number)
- language (string)

Quest 
- id (ObjectId)
- name (string)
- description (string)
- isCompleted (boolean)
- parent (Quest.id)

PlayerState
- id (ObjectId)
- player (Player.id)
- quest (Quest.id)
- character ([Character.id])
- level (number)

GameState 
- id (ObjectId)
- host (Player.id)
- status (string, enum: playing | idle | offline)
- createdAt (Date)
- inventory ([Item.id])
- playerStates ([PlayerState])
- characters ([Character.id])

Character
- id (ObjectId)    
- name (string)
- class (string)
- race (string)
- hitDie (number)
- statistics (Stats)
- skills ([Skill])
- currency([Currency])
- items ([Item.id])

Stats 
- armorClass (number)
- hitPoints (number)
- manaPoints (number)
- strength(number)
- dexterity(number)
- constitution(number)
- intelligence(number)
- wisdom(number)
- charisma(number)

Skill
- id (ObjectId)
- name (string)
- description (string)
- manaCost (number)
- levelRequirement (number)

Item
- id (ObjectId)
- name (string)
- description (string)
- quantity (number)
- price (number, enum: buy | sell)
- source (string, enum: buyable | looted)
- type (string, enum: support | throwable)
- effect (string)

Currency
-id (ObjectId)
-quantity (number)

Monster
- id (ObjectId)
- name (string)
- type (string, enum: undead | plant | ooze | monstrosity | dragon | aberration )
- hitDice (number)
- statistics (Stats)
- actions ([MonsterAction])
- loot ([Item.id])

MonsterAction
- id (ObjectId)
- name (string)
- description (string)
- type (string, enum: melee | range)

### Techs
- HTML/CSS/JS (...)
- React (...)
- Node (...)
- Express (...)
- Mongo (...)
- Mocha & Chai (...)
- [...]

### Test Coverage
A contrario del de Javi el mio no esta cubierto!🤡 Le colocare un sombrerito para que no pase frio👒