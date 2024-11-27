#  <center>📚Entelequia Comic-Book Store📚</center>
![alt text](image-1.png)
## 📖 Intro

Entelequia Comic-Book Store es un proyecto de e-commerce que ofrece una amplia variedad de cómics , Manga y todo lo relacionado al mundo geek 🤓. 
Inspirado en el negocio en el cual pase casi toda mi vida, este sitio web permitirá a los usuarios explorar, seleccionar y comprar Cómics/Mangas, además de acceder a contenido exclusivo sobre sus personajes y series favoritos.

## 💡Functional Overview

### 🎯Use Cases

 #### User 

- 🔍 Browse comics by category, author, or publisher

- 🛒 Add comics to a shopping cart

- 👤 Manage account details

- 📝 Create reviews on purchased items

- ⭐ View and mark comics as favorites

- 📜 View purchase history 

- 📦 Track order status

#### Admin 
- 🗂️ Manage product listings ( add | edit | delete)

- 📈 Manage clients orders (change status)

- 📢 Review and respond to user feedback


### 🎨 UXUI Design

[Figma Wireframe](https://www.figma.com/design/n9w5SAKtC9lT4FHbCasC9c/Project-E-commerce?node-id=0-1&t=m6Cd2jkL9vMvlILw-1)

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
- id(uuid)
- name(string)
- email(string)
- username (string)
- password (string)
- role (string, enum: user , admin)
### Product
- id (uuid)
- title (string)
- author (string)
- publisher (string)
- isbn (string)
- Price (number)
- Description (string)
- Category (string)
- status (string , enum: published | draft | deactivated)
- stock(number)
- Image (string)
- reviews([Review])
- created at (Date) 
- modified at (Date,optional) 

### Review
- id (uuid)
- user (User.id)
- rating (number)
- comment (string)
- date(date)

### CartItem
- id (uuid)
- product(Product.id)
- quantity(number)

### Cart
- id(uuid)
- user (User.id)
- items ([CartItem])
- totalPrice (number)

### OrderItem
- id (uuid)
- product(Product)
- quantity(number)

### Order
- id (uuid)
- user (User.id)
- items ([OrderItem])
- totalPrice (number)
- created at (Date) 
- modified at (Date,optional) 
- status (string, enum:confirmed | refund | cancel)


### 🚀 Technologies Used

- Frontend: HTML, CSS, JavaScript, React

- Backend: Node.js, Express

- Database: MongoDB

- Testing: Mocha & Chai for unit and API testing


### 📊 Test Coverage
The project includes test coverage for critical frontend components and backend routes. Tests ensure smooth functioning of all major features, including the shopping cart, reviews, and user authentication.
                       <p align="center">![alt text](image-5.png)</p>
                 