# Hourify / Packly - Time tracker

## Intro

El presente proyecto desarrolla una aplicación enfocada en la gestión del tiempo o "unidades de sesión" para cualquier persona suceptible de vender o comprar servicios que impliquen tiempo o sesiones de otra persona. Idealmente está pensada para freelancers, aunque es extendible a prácticamente la totalidad de la población. 

Cuando un profesional que vende servicios trabaja con muchos clientes simultáneamete, y cada uno de ellos contrata un numero variable de horas / sesiones, la gestión se puede volver complicada. Obligando a los profesionales a construir complejas hojas de excel para saber en qué punto se encuentra con cada cliente. 

El objetivo principal de esta aplicación será, por tanto, mejorar la gestion del tiempo / sesiones  de personas que intercambian servicios,

A modo de ejemplo, un freelance que vendre horas de programación, diseño web, ilustración, escritura... podrá gestionionar packs de horas, asignarlos a sus clientes, y controlar de forma precisa el tiempo que destina a cada uno de ellos. 

Por otro lado, un psicologo que vende sesiones de 45 minutos, podrá usar también la aplicación gestionando unidades de sesión, y no unidades de tiempo, mejorando de esta forma la usabilidad. 

La aplicación permitirá mostrar de una forma visual y sencilla, el estado de un cliente, saber si ha pagado, consultar el estado de horas o sesiones disponibles, el registro de tiempo consumido, así como el envío de notificaciones al cliente cuando esto sea necesario. 

El cliente, por su lado, podrá ver el estado de su pack de horas contratadas, así como el tiempo consumido por el freelance, y en qué se ha consumido el tiempo. También podrá recibir notificaciones tras la compra de un pack, o cuando le queden pocas horas por consumir, para que pueda decidir si tiene que adquirir más tiempo. 

El cliente también podrá comunicarse a través de la aplicación con el freelance que gestiona su pack para la resolución de dudas así como cualquier tema relacionado con su tiempo. 

Este programa lo podrán utilizar personas como: 
- Diseñadores web y programadores,
- Psicologos y coaches, 
- Medicos y profesionales de la salud, 
- Pintores, ilustradores y fotógrafos, 
- Gestores, consultores, auditores,
- Y, en general, cualquier persona suceptible de vender servicios a horas o sesiones.


![](url de la imagen a mostrar)

## Functional

### Use Cases

User Standard
- Consultar / modificar datos personales
- Consultar estado de sus packs de horas contratadas
- Visualizar estado pago
- Visualizar Tiempo o unidades consumido / disponible
- Visualizar historial de registros
- Mensajería con los otros usuarios de la plataforma

User Provider
- Gestión de clientes (CRUD)
- Gestión de packs (CRUD)
- Asignación de packs a clientes
- Crear usuarios "fake" (para poder asignar un pack si el usuario cliente todavía no existe en la plataforma)
- Mientras el usuario "cliente" no existe, el usuario proveedor puede modificar sus datos personales. 
- Una vez el usuario "cliente" ha sido creado el proveedor que lo ha creado ya no lo podrá modificar. 
- Gestionar tiempo de los packs (aumentar, disminuir, via temporizador)
- Gestionar unidades de los packs
- Envio de notificaciones al cliente.   

### UXUI Design

[Figma](https://figma.com)

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

- HTML/CSS/JS (...)
- React (...)
- Node (...)
- Express (...)
- Mongo (...)
- Mocha & Chai (...)
- [...]

### Data Model

BasePack
- id (UUID)
- user (User.id)
- packName (string)
- packDescription (string)
- quantity (num)
- unit (string, enum: hours | units)
- expiringTime (num, enum: 1 to 12months (-1 = infinite))
- price (num)
- currency (string, enum: EUR | USD, default: EUR)


User
- id (UUID)
- username (string)   
- password (string)   
- plan (string, enum: free | pro) 
- planExpiryDate (Date) 
- role ([string, enum: standard | provider]) 
- dni (string) 
- name (string)
- surname1 (string)
- surname2 (string)
- biography (string)
- country (string)
- province (string)
- city (string)
- cp (string)
- street (string)
- street2 (string)
- number (num)
- flat (num)
- email (string)
- legalName (string)
- website (string)
- CreationStatus (string, enum: true | false | confirm account)
- customers ([User.id])
- ownPacks ([Pack.id])
- adquiredPacks ([Pack.id])


Pack
- id (UUID)
- refPack (UUID)
- provider (UUID)
- customer (UUID)
- description (string) max 255
- originalQantity (num)
- remainingQantity (num)
- unit (string, enum: hours | units)
- price (num)
- currency (string, enum: EUR | USD, default: EUR)
- purchaseDate (date)
- expiryDate (date, enum: Date | Null)
- status (string, enum: Pending | Active | Expired | Finnished)


Activity
- id (UUID)
- Pack (Pack.id)
- date (date)
- description (string)
- operation (string, enum: add | substract)
- quantity (num)


Payment
- id (UUID)
- Pack(Pack.id)
- amount (num)
- currency (string, enum: EUR | USD, default: EUR)
- date (date)
- method (string, enum: card | bank_transfer | paypal | stripe)
- status (string, enum: pending | completed | canceled | refunded)

### Test Coverage

```sh
----------------------|---------|----------|---------|---------|-------------------
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------|---------|----------|---------|---------|-------------------
All files             |   96.96 |       50 |     100 |   96.87 |                   
 registerUser.js      |    92.3 |       50 |     100 |   91.66 | 23                
 registerUser.spec.js |     100 |      100 |     100 |     100 |                   
----------------------|---------|----------|---------|---------|-------------------
```
