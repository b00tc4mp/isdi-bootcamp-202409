# Unsocial

## Intro

This section should be descriptive on the purpose of the app. 

![](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGUxYmN2dHF1NGw5MDcwa2liOGptNjk5eTB6OGRwcG00N3VmcGphbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/14wXMGbHjXK2k0/giphy-downsized-large.gif)

## Functional

### Use Cases

Regular (User)
- publish a post
- delete a post
- like / unlike a post
- add / remove comment
- follow / unfollow user
- chat with user
- report a user / post / comment
- add / link review 
- recommend service

Moderator (User)
- view reporting list
- view reporting detail
- ban user / post / comment
- shadow ban content
- archive

### UXUI Design

[Figma](https://figma.com)
this section should contain the app's figma

## Technical

### Blocks

- App (...)
- API (...)
- DB (...)

### Packages

- api (...)
- app (...)
- com (...)
- dat (...)
- doc (...)

### Technologies

- HTML / CSS / JS / MONGO / REACT
- ...

### Data Model

User
- name (string)
- email (string)
- username (string)
- password (string)
- role (string, enum: regular | moderator)


Post
- posts / reviews (objects)


### Test Coverage

example from prof: 

```sh
----------------------|---------|----------|---------|---------|-------------------
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------|---------|----------|---------|---------|-------------------
All files             |   96.96 |       50 |     100 |   96.87 |                   
 registerUser.js      |    92.3 |       50 |     100 |   91.66 | 23                
 registerUser.spec.js |     100 |      100 |     100 |     100 |                   
----------------------|---------|----------|---------|---------|-------------------
```
