#  <center>📚Entelequia Comic-Book Store📚</center>
![alt text](image-1.png)
## 📖 Intro

Entelequia Comic-Book Store es un proyecto de e-commerce que ofrece una amplia variedad de cómics , Manga y todo lo relacionado al mundo geek 🤓. 
Inspirado en el negocio en el cual pase casi toda mi vida, este sitio web permitirá a los usuarios explorar, seleccionar y comprar Cómics/Mangas, además de acceder a contenido exclusivo sobre sus personajes y series favoritos.

## 💡Functional Overview

### 🎯Use Cases

 #### User 

- 🔍 Browse comics by category / subCategory

- 🛒 Add / Update /Remove products to a shopping cart

- 💳 Purchase products

- 👤 Manage account details

- 📝 Create reviews on purchased items (1.0)

- ⭐ View and mark comics as favorites(1.0)

- 📜 View purchase history 

- 📦 Track order status

#### Admin 
- 🗂️ Manage product listings ( add | edit | delete) (1.0)

- 📈 Manage clients orders (change status)(1.0)

- 📢 Review and respond to user feedback(1.0)


### 🎨 UXUI Design

[Figma Wireframe](https://www.figma.com/design/n9w5SAKtC9lT4FHbCasC9c/Project-E-commerce?node-id=0-1&t=m6Cd2jkL9vMvlILw-1)

Here are the initial wireframes for an intuitive, responsive interface. The designs are optimized for both desktop and mobile devices.


![alt text](pageDemo.gif)  


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
- role (string, enum: user , moderator)
- street (string)
- city (string)
- country (string)
- postalCode (string)
- phone(string)

### Product
- id (uuid)
- title (string)
- author (string)
- publisher (string)
- isbn (string)
- price (number)
- description (string)
- category (string)
- status (string , enum: published | draft | deactivated)
- stock(number)
- image (string)
- images([string])
- bestSeller (boolean)
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
- status (string, enum:pending | confirmed | refund | cancel)


### 🚀 Technologies Used

- Frontend: HTML, Tailwind CSS, JavaScript, React

- Backend: Node.js, Express,Mongoose, JWT,Bcrypt

- Database: MongoDB

- Testing: Mocha & Chai for unit and API testing


### 📊 Test Coverage
The project includes test coverage for critical backend logics. Tests ensure smooth functioning of all major features, including the shopping cart and user authentication.

```sh
----------------------------|---------|----------|---------|---------|--------------------------------
File                        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line 
----------------------------|---------|----------|---------|---------|--------------------------------
All files                   |    95.1 |    82.89 |   91.11 |   95.13 | 
 config                     |   83.33 |       50 |     100 |   83.33 | 
  stripe.js                 |   83.33 |       50 |     100 |   83.33 | 5
 helpers                    |     100 |       50 |     100 |     100 | 
  stripePayment.js          |     100 |       50 |     100 |     100 | 20
 logic/cart                 |   84.93 |    81.81 |   85.71 |   84.05 | 
  getCart.js                |   94.44 |     87.5 |      75 |   93.75 | 20
  updateCart.js             |   81.81 |    78.57 |     100 |   81.13 | 16,25,30-33,41,51,61,69,79,101
 logic/cart/test            |     100 |      100 |     100 |     100 | 
  getCart.spec.js           |     100 |      100 |     100 |     100 | 
  updateCart.spec.js        |     100 |      100 |     100 |     100 | 
 logic/orders               |   91.37 |       85 |   78.26 |   90.74 | 
  getOrders.js              |   96.42 |       75 |   85.71 |   96.29 | 11
  placeOrder.js             |   84.21 |      100 |   76.92 |   82.35 | 30,50,57
  updateOrder.js            |    90.9 |      100 |   66.66 |      90 | 16
 logic/orders/test          |     100 |      100 |     100 |     100 | 
  getOrders.spec.js         |     100 |      100 |     100 |     100 | 
  placeOrder.spec.js        |     100 |      100 |     100 |     100 | 
  updateOrder.spec.js       |     100 |      100 |     100 |     100 | 
 logic/payments             |      84 |       90 |    62.5 |    82.6 | 
  processPayment.js         |      84 |       90 |    62.5 |    82.6 | 14,19,36,44
 logic/payments             |      84 |       90 |    62.5 |    82.6 | 
  processPayment.js         |      84 |       90 |    62.5 |    82.6 | 14,19,36,44
 logic/payments/test        |     100 |      100 |     100 |     100 | 
  processPayment.spec.js    |     100 |      100 |     100 |     100 | 
  processPayment.js         |      84 |       90 |    62.5 |    82.6 | 14,19,36,44
 logic/payments/test        |     100 |      100 |     100 |     100 | 
  processPayment.spec.js    |     100 |      100 |     100 |     100 | 
 logic/products             |   88.88 |     87.5 |      80 |   88.88 | 
 logic/payments/test        |     100 |      100 |     100 |     100 | 
  processPayment.spec.js    |     100 |      100 |     100 |     100 | 
 logic/products             |   88.88 |     87.5 |      80 |   88.88 | 
  getProducts.js            |   88.88 |     87.5 |      80 |   88.88 | 10,13
  processPayment.spec.js    |     100 |      100 |     100 |     100 | 
 logic/products             |   88.88 |     87.5 |      80 |   88.88 | 
  getProducts.js            |   88.88 |     87.5 |      80 |   88.88 | 10,13
 logic/products/test        |     100 |      100 |     100 |     100 | 
 logic/products             |   88.88 |     87.5 |      80 |   88.88 | 
  getProducts.js            |   88.88 |     87.5 |      80 |   88.88 | 10,13
 logic/products/test        |     100 |      100 |     100 |     100 | 
  getProducts.spec.js       |     100 |      100 |     100 |     100 | 
  getProducts.js            |   88.88 |     87.5 |      80 |   88.88 | 10,13
 logic/products/test        |     100 |      100 |     100 |     100 | 
  getProducts.spec.js       |     100 |      100 |     100 |     100 | 
 logic/users                |   88.23 |    83.33 |   81.81 |    88.6 | 
 logic/products/test        |     100 |      100 |     100 |     100 | 
  getProducts.spec.js       |     100 |      100 |     100 |     100 | 
 logic/users                |   88.23 |    83.33 |   81.81 |    88.6 | 
  getProducts.spec.js       |     100 |      100 |     100 |     100 | 
 logic/users                |   88.23 |    83.33 |   81.81 |    88.6 | 
  authenticateUser.js       |   85.71 |       75 |     100 |   89.47 | 17,27
  getUserProfile.js         |   95.23 |      100 |     100 |   94.73 | 17
 logic/users                |   88.23 |    83.33 |   81.81 |    88.6 | 
  authenticateUser.js       |   85.71 |       75 |     100 |   89.47 | 17,27
  getUserProfile.js         |   95.23 |      100 |     100 |   94.73 | 17
  registerUser.js           |      90 |       50 |     100 |   89.47 | 20,29
  authenticateUser.js       |   85.71 |       75 |     100 |   89.47 | 17,27
  getUserProfile.js         |   95.23 |      100 |     100 |   94.73 | 17
  registerUser.js           |      90 |       50 |     100 |   89.47 | 20,29
  getUserProfile.js         |   95.23 |      100 |     100 |   94.73 | 17
  registerUser.js           |      90 |       50 |     100 |   89.47 | 20,29
  updateUserProfile.js      |    82.6 |      100 |      60 |   81.81 | 16-17,31-32
  registerUser.js           |      90 |       50 |     100 |   89.47 | 20,29
  updateUserProfile.js      |    82.6 |      100 |      60 |   81.81 | 16-17,31-32
 logic/users/test           |     100 |      100 |     100 |     100 | 
  updateUserProfile.js      |    82.6 |      100 |      60 |   81.81 | 16-17,31-32
 logic/users/test           |     100 |      100 |     100 |     100 | 
  authenticateUser.spec.js  |     100 |      100 |     100 |     100 | 
 logic/users/test           |     100 |      100 |     100 |     100 | 
  authenticateUser.spec.js  |     100 |      100 |     100 |     100 | 
  getUserProfile.spec.js    |     100 |      100 |     100 |     100 | 
  authenticateUser.spec.js  |     100 |      100 |     100 |     100 | 
  getUserProfile.spec.js    |     100 |      100 |     100 |     100 | 
  registerUser.spec.js      |     100 |      100 |     100 |     100 | 
  getUserProfile.spec.js    |     100 |      100 |     100 |     100 | 
  registerUser.spec.js      |     100 |      100 |     100 |     100 | 
  updateUserProfile.spec.js |     100 |      100 |     100 |     100 | 
----------------------------|---------|----------|---------|---------|--------------------------------
  registerUser.spec.js      |     100 |      100 |     100 |     100 | 
  updateUserProfile.spec.js |     100 |      100 |     100 |     100 | 
----------------------------|---------|----------|---------|---------|--------------------------------
  updateUserProfile.spec.js |     100 |      100 |     100 |     100 | 
----------------------------|---------|----------|---------|---------|--------------------------------
```


                       



                                     