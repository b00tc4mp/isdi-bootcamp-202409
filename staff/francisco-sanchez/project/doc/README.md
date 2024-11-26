# Hourify / Packly - Time tracker

## Intro

El presente proyecto desarrolla una aplicación enfocada en la gestión del tiempo para freelancers o cualquier persona que venda servicios o tiempo en general. 

Cuando un profesional que vende servicios trabaja con muchos clientes simultáneamete, y cada uno de ellos contrata un numero variable de horas, la gestión puede ser algo complicada. Obligando a los profesionales a construir complejas horas de excel para saber en qué punto se encuentra con cada cliente. 

El objetivo principal de esta aplicación será, por tanto, mejorar la eficiencia de los profesionales simplificando esta parte de su flujo de trabajo. 

A modo de ejemplo, un freelance que vendre horas de programación, diseño web, ilustración, escritura... podrá gestionionar packs de horas, asignarlos a sus clientes, y controlar de forma precisa el tiempo que destina a cada uno de ellos. 

La aplicación permitirá mostrar de una forma visual y sencilla, el estado de un cliente, saber si ha pagado, consultar el estado de horas disponibles, el registro de tiempo consumido, así como el envío de notificaciones al cliente cuando esto sea necesario. 

El cliente, por su lado, podrá ver el estado de su pack de horas contratadas, así como el tiempo consumido por el freelance, y en qué se ha consumido el tiempo. También podrá recibir notificaciones tras la compra de un pack, o cuando le queden pocas horas por consumir, para que pueda decidir si tiene que adquirir más tiempo. 

El cliente también podrá comunicarse a través de la aplicación con el freelance que gestiona su pack para la resolución de dudas así como cualquier tema relacionado con su tiempo. 

Este programa lo podrán utilizar personas como: 
- Diseñadores web y programadores,
- Psicologos y coaches, 
- Medicos y profesionales de la salud, 
- Pintores, ilustradores y fotógrafos, 
- Gestores, consultores, auditores,
- Y, en general, cualquier profesional suceptible de vender servicios a horas o franjas horarias.


![](url de la imagen a mostrar)

## Functional

### Use Cases v.0

Customer (User)
- Consultar / modificar datos personales
- Consultar estado de sus packs de horas
- Visualizar estado pago
- Visualizar Tiempo consumido / disponible
- Visualizar historial de registros
- Mensajería con el freelance asignado


Freelance (User)
- Gestión de clientes (CRUD)
- Gestión de packs (CRUD)
- Asignación de packs a clientes
- Gestionar tiempo de los packs (aumentar, disminuir, via temporizador)
- Crear log de registro
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

Usercd
- name (string)
- email (string)
- username (string)
- password (string)
- role (string, enum: regular | moderator)

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
