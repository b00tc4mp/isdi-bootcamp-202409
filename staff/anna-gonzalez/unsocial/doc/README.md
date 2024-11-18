# Unsocial

## Intro

This app is just for unsocial people who do not want to interact seriously with anybody, fight with other people, ...

![](https://media.giphy.com/media/W12KOpdv6MRa75ln4m/giphy.gif?cid=ecf05e47ql99tq9my7ifkyqfc14o5c5p2snox8s9yngpfo8g&ep=v1_gifs_search&rid=giphy.gif&ct=g)

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

Moderator (User)
- view reporting list
- view reporting detail
- ban user / post / comment

### UXUI Design

[Figma](https://figma.com)

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

- HTML / CSS / JS 
- ...

### Data Model

User
- name (string)
- email (string)
- username (string)
- password (string)
- role (string, enum: regular | moderator)

Post
- ...

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