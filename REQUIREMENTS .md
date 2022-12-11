# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index '/products  ' via `GET` method 
- Show  '/product/:id  ' via `GET` method
- Create  '/product  ' via `POST` method[token required]
- update '/product/:id  ' via `PATCH` method[token required]
- delete '/product/:id ' via `DELETE` method [token required]



#### Users
- Index '/users' via `GET`'/product/:id ' [token required]
- Show '/user/:id' via `GET`[token required]
- Create '/user' via `POST`
- update '/user/:id' via `PATCH`[token required]
- delete '/user/:id' via `DELETE`[token required]


#### Orders
- Index '/orders' via `GET` [token required]
- Show '/order/:id' via `GET`[token required]
- Create '/order' via `POST`
- update '/order/:id' via `PATCH`[token required]
- delete '/order/:id' via `DELETE`[token required]

## Data Shapes
#### Product
-  id `uuid` 
- name `varchar`
- price `integer`
-  category `varchar`

#### User
- id `uuid` 
- first `varchar`
- last `varchar`
- password `varchar`

#### Orders
- id `SERIAL PRIMARY KEY`
-status `varchar` (active or complete)
- quantity `integer`
- product_id `uuid REFERENCES products(id)`
- user_id `uuid REFERENCES users(id)`




