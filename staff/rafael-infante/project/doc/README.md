# Loving Hands APP

## Intro

This is a Mobile app for elderly people who need some assistance at home.

![](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3BoOGxjemJqb29kdmFjbml5dWdyemhodW03aGYzM2EwMHkyNWlkYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/icamgh2X6Cego/giphy.webp)

## Functional

### Use Cases

Caregiver (User)

- Create and publish help offers: Specify the type of help offer with the availability, address and price.
- Search for help requests: Browse active requests on the platform and communicate with assistance seekers.
- Submit offers: Send offers to assist an elder with specific needs.
- Manage profile: Update availability, view ratings, and manage completed tasks.
- Rate elders: Send a review with a rating of the elder.

Elder (User)

- Create help requests: Specify the type of assistance needed and publish requests.
- Search for assistance offers: Browse active offers on the platform and communicate with caregivers.
- Save the post of a specified caregiver.
- Rate the caregiver: Provide a feedback after receiving help.

### UXUI Design

[Figma](https://www.figma.com/design/vvDGYcAaFPJKgUSgKO6Gkm/LovingHands?node-id=0-1&node-type=canvas&t=QOzUYzlKPp6uLx4E-0)

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
- React JS (...)
- Node (...)
- Express (...)
- Mongo (...)
- Mocha & Chai (...)
- [...]

### Data Model

User

- id (uuid)
- name (string)
- address (string)
- email (string)
- username (string)
- password (string)
- rating (object)
- role (string, enum: caregiver | elder)
- permission (string, enum: read | write)

Rating

- stars (number)
- reviews (string)

Post

- id (uuid)
- author (string)
- image (string)
- text(string)
- date (Date)
- comments (object)

Comment

- id (uuid)
- comment (string)

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
