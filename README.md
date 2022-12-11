# Udacity StoreFront Backend Project

## Required Tecnologies
- Postgres for database
- Node && Express for backend logic
- Dotenv to manage environment variables
- db-migrate to create unique tables
- jsonwebtoken to get jwt for access specific APIs
- jasmine for testing
- prettier for formatting code
- eslint for discovering errors


## Packages Installation

npm i


## db Setup

1. connect to postgres via `psql -U postgress`
2. create dev db via `CREATE DATABASE store_database;`
2. create test  db  via `CREATE DATABASE store_test_database;`


## How to use
- create `.env` file

##  .env variables
- POSTGRES_HOST=127.0.0.1
- POSTGRES_DB=store_database
- POSTGRES_USER=postgres
- POSTGRES_PASSWORD=marcoreus19
- POSTGRES_TEST_DB=store_test_database
- NODE_ENV=dev
- BCRYPT_PASSWORD=my_SECRET_PASSWORD
- SALT_ROUNDS=10
- TOKEN_SECRET=my_SECRET_TOKEN


## Scripts
- first you must run 
`npm run migrate` to add unique tables
- second `npm run start ` to run server
-`npm run jasmine` to run tests
-`npm run build` to compile typescript to javascript

-`npm run lint` to run check errors

-`npm run prettier` to run check formating


## APIs
### User API Testing
 By using postman Or Thunder Client VScode Extension 
- to create new user 
(http://localhost:3000/user)
inside body you must fill \
{    `  "first":"your first name"        `\
 `   "last":"your last name"        `\
 `   "password":"your password"     `\
}

- then you will get a token to make you able to 
1- show all users 
(http://localhost:3000/users)

2-  show specific user by his id 
(http://localhost:3000/user/:id)


3-  update specific user by his id 
(http://localhost:3000/user/:id)

4-  delete specific user by his id 
(http://localhost:3000/user/:id)



### Product API Testing
 By using postman Or Thunder Client VScode Extension 
- to create new product you must be authorized 
then use this :
(http://localhost:3000/product)
inside body you must fill \
{                              
  `  "name":"your product name"  `\
 `   "price":"your product price" `\
 `   "category":"its category"    `\
}`

1- show all products 
- you can be unauthorized

(http://localhost:3000/products)

2-  show specific product by its id 
- you can be unauthorized

(http://localhost:3000/product/:id)

3-  update specific product by its id 
- you must be authorized

(http://localhost:3000/product/:id)

4-  delete specific product by its id
- you must be authorized

(http://localhost:3000/product/:id)



### Order API Testing
 By using postman Or Thunder Client VScode Extension 
- to create new order you must be authorized 
then use this :
(http://localhost:3000/product)
inside body you must fill \
{                             
  `  "status": "active or complete",         `\
 `   "quantity":what quantity  you want       `\
 `   "product_id":"id of product you want"     `\
 ` "user_id":"your id"                       `

}

1- show all products 
- you must be authorized

(http://localhost:3000/orders)

2-  show specific order by its id 
- you must be authorized

(http://localhost:3000/order/:id)

3-  update specific order by its id 
- you must be authorized

(http://localhost:3000/order/:id)

4-  delete specific order by its id
- you must be authorized

(http://localhost:3000/order/:id)
