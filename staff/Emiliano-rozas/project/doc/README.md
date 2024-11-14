#  <center>📚Entelequia Comic-Book Store📚</center>
![alt text](image-1.png)
## 📖 Intro

Entelequia Comic-Book Store es un proyecto de e-commerce que ofrece una amplia variedad de cómics , Manga y todo lo relacionado al mundo geek 🤓. 
Inspirado en el negocio en el cual pase casi toda mi vida, este sitio web permitirá a los usuarios explorar, seleccionar y comprar cómics, además de acceder a contenido exclusivo sobre sus personajes y series favoritos.

## 💡Functional Overview

### 🎯 User Use Cases

- 🔍 Browse comics by category, author, or publisher

- 🛒 Add comics to a shopping cart

- 👤 Manage account details

- 📝 Create reviews on purchased items

- ⭐ View and mark comics as favorites

- 📜 View purchase history 

- 📦 Track order status

### Admin Functionalities
- 🗂️ Manage product listings 
   - add
   - edit 
   - delete

- 📈 Manage clients orders

- 📢 Review and respond to user feedback

- 👥 Manage user accounts



### 🎨 UXUI Design

[Figma Wireframe](https://figma.com)

Here are the initial wireframes for an intuitive, responsive interface. The designs are optimized for both desktop and mobile devices.


![alt text](image-2.png)  ![alt text](image-3.png) 


## ⚙️Technical Overview

### 🔧 Project Structure

- **App**: Client-side React application

- **API**: Server-side API built with Express

- **DB**: MongoDB database for storing products, users, and orders

### 📦 Key Packages

- **doc**: Project documentation

- **app**: Client-side React application

- **api**: Server-side API with Express

- **dat**: Data model and MongoDB connection

- **com**: Common utilities, validation functions, etc.

### 🗃️ Data Model

### User
- id (UUID): Unique user identifier

- name (string): Full name

- email (string): Email address

- username (string): Username

- password (string): Encrypted password

### Product
- id (UUID): Unique comic identifier

- title (string): Comic title

- author (string): Author of the comic

- publisher (string): Publisher

- price (number): Price

- description (string): Description

- category ('string):  Genre/category

- stock (number): Inventory stock

- image ('string'):  Cover image URL

- reviews ([{
   - id (UUID): Review identifier
   - user (User.id): Review author
   - rating (number): Rating
- comment (string): Review text }])


### Order
- id (UUID): Unique order identifier

- user (User.id): User who placed the order

- items ([Product.id]): List of purchased items

- totalPrice (number): Total price of the order

- date (Date): Date of purchase

- status (Property?): Delivery status


### 🚀 Technologies Used

- Frontend: HTML, CSS, JavaScript, React

- Backend: Node.js, Express

- Database: MongoDB

- Testing: Mocha & Chai for unit and API testing


### 📊 Test Coverage
The project includes test coverage for critical frontend components and backend routes. Tests ensure smooth functioning of all major features, including the shopping cart, reviews, and user authentication.
                       <p align="center">![alt text](image-5.png)</p>
                 