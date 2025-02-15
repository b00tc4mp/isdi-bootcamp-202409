# [PetCare]

## Intro

Welcome to the app that you are going to use to take care of your pet from now on.
The easiest way to find what your pet needs in just a few minutes, in the palm of your hand.

Are you looking for a vet? Or maybe you are looking for a specialist trainer for your dog or even do some necessary grooming, then you are in the right place.

Basically, it is a modern solution for all your pet care needs.

Why should you use PetCare?

- convenience: find and book services in minutes.
- transparency: read reviews and ratings from other pet owners
- customization: save your favourites

Benefits of using PetCare as a non-customer:

- book appointment as guest
- see centres list

Benefits of using PetCare as a customer:

- find by distance what is closest to you using the list or the integrated map.
- you can also use the search bar to find a specific place or trainer.
- see ratings and what people think about that vet.
- share your experience of a place or a trainer to help them with their positioning and reputation.
- save your vet, place or trainer to your favs so you won’t loose it for next time.
- book your next appointment directly from the app or check the availability
- check information about a centre or trainer (such as address, photos, contact, comments) -partner profile
- create your profile/account to keep your information updated (mainly by mail - no phone by now)
- request to remove an added comment/review
- change your password / recover password in case of forgetting it

Benefits of using PetCare as a partner:

- create your own admin profile
- manage the availability of your appointments
- add the opening/closing time
- receive a notification every time a customer books a time slot (mail, pop-up)
- manage the photos of your centre _(**I’d like to have this after verification really**)_
- request to remove a comment that breaks the rules of using the app/terms of use (such as hurtful, racist, etc comments)
- manage prices and duration
- you can request to apply for the Visibility Program which includes better positioning, more visibility. It will show that a centre has been accepted and reviewed to be a VIP(VIsibility program) member with a specific tag next to the name. (\*like a specific icon w specific colour).
- change your password / recover password in case of forgetting it

![](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXVlZ2hwZWdvcnFrZ3ZhMHF3N3R3YWx6ejhnYWY0ODRkb3Y4bnk0eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j0QzDgFZRX2njRxxtP/giphy-downsized-large.gif)

## Functional

PetCare is a modern solution for all your pet care needs.

### Use Cases

#### User

- search places
- search trainers
- search pet sitters (planned feature)
- search services (planned feature)
- comment
- see comments from people in centre profiles
- see place profile
- see trainer profile
- save provider (in favs)
- save trainer (in favs)
- edit profile (mail, name, social links, phone)
- book appointment
- request to remove a comment
- add pet (name, avatar, birthdate, species)
- edit pet
- remove pet
- view pets

#### Provider

- edit provider profile (mail, phone, description, name, location, social links)
- manage availability of your place and opening hours
- view notifications of new appointments made by customers (pop-up or mail)
- manage photos of your provider
- report a comment
- apply to Visibility Program (planned for future)
- manage prices of treatments and duration

#### Guest (planned for future)

- book appointment as guest
- see provider list

### UXUI Design

[Figma](https://figma.com)
Tailwind
CSS

## Technical

[Here I will show the techs I've used in this project]

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
- role ( string, enum: customer | provider | guest)
- name (string)
- email (string)
- password (string)
- reviews ( [Review])
- profile pic (string)
- images ([string])
- description (string, maxLength)
- postal code (string)
- location (Location)
- address (string)
- category ( string, enum: vets | trainers | accomodations | pet sitters )

Location

- type (string, point)
- coordinates ([Number])

Review

- id (UUID)
- author (User.id)
- text (string, maxLength)
- date (Date)
- rating (number, enum: 0 to 5 stars)

Appointment

- id (UUID)
- customer (User.id)
- provider (User.id)
- date (Date)

Service (planned for future)

- id (UUID)
- name (string)
- description (string)
- duration (number, hours)
- provider (User.id)

### Techs

- HTML/CSS/JS (...)
- React (...)
- Node (...)
- Express (...)
- Mongo (...)
- Mocha & Chai (...)
- [...]

### Test Coverage

[ How do I test it? Does it work? Why?]

### ROADMAP

WIP

V.1

- map in explorer

V.2

V.3
