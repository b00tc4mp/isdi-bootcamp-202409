# Nombre de la App

## Intro

Esta aplicación está diseñada para ayudarte a gestionar y alcanzar tus objetivos personales de forma sencilla y eficiente. Su sección principal, Hábitos, te permite crear, personalizar y gestionar tus hábitos diarios desde cero. Incluye una Agenda Personal, donde puedes organizar tu día añadiendo actividades en bloques de tiempo especifícos. Además, cuenta con un apartado de Metas/Objetivos, donde puedes establecer tus propósitos a corto, medio y largo plazo (semanales, mensuales o anuales). Por último, la sección de Progreso te ofrece una vista detallada de tu desempeño, mostrando cuándo cumples tus hábitos, cuándo los fallas y tu avance general.

![../assets/LOGO.png]

## Functional

### Use Cases

Regular (User)
- Añadir un hábito.
- Crear un hábito personalizado.
- Eliminar hábito.
- Ver el progreso de tus hábitos.
- Marcar unos objetivos dependiendo del periodo: semanal, mensual, anual, etc.
- Agendar tus actividades.
- Cambiar su foto de perfil.

 Admin (User)
- Añadir más hábitos predeterminados.

## UX/UI Design
[Figma](https://www.figma.com/design/Xr14drDqhg4qKwW4yzaV1/H%C3%A1bitos)

## Technical

### Blocks

- App (client-side application)
- API (server-side API)
- DB (database)

### Packages

- doc (documentation)
- app (client-side application)
- api (server-side API)
- dat (data model and driver)
- com (common validations, utils, ...)

### Techs

- HTML/CSS/JS (...)
- React (...)
- Node (...)
- Express (...)
- Mongo (...)
- Mongo & Chai (...)
- [...]

### Data Model

User
- id (UUID)
- name (string)
- email (string)
- password (string)
- role (string, enum: regular | admin)

Habit
- id (UUID)
- name (string)
- emoji (string, maxlength 4)
- user (User.id)
- createdAt: (Date)
- category (string, enum: salud y bienestar | actividad fisica | desarrollo personal | negativos | finanzas | sociales)
- subcategory (string, enum: salud y bienestar...)

Goal
- id (UUID)
- description (string)
- period (string, enum: weekly | monthly | yearly)
- objective (number)
- user (User.id)
- habit (Habit.id) ??

Progress
- id (UUID)
- date (Date)
- status (enum: done | missed | half-done )
- habit (Habit.id)

Event (agenda personal)
- id (UUID)
- name (string)
- description (string)
- startDate (Date)
- endDate (Date, optional)
- frequency (string, enum: once | daily | weekly | monthly..., default: once)
- user (User.id)
- habit (Habit.id, optional)
- goal (Goal.id, optional)

### Test Coverage

vacío