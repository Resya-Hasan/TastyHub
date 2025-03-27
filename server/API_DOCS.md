API Documentation

Endpoints

List of available endpoints:

POST /register

POST /login

GET /menus

GET /menus/:id

POST /order

POST /wishlist/:productId

DELETE /wishlist/:productId

GET /ai/recommend

POST /menus (Admin only)

PUT /menus/:id (Admin only)

DELETE /menus/:id (Admin only)

GET /orders (Admin only)

PUT /orders/:id/status (Admin only)

POST /register

## Registers a new user.

Request Body

{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}

Response Body (201 - Created)

{
  "id": "number",
  "username": "string",
  "email": "string"
}

Response Body (400 - Bad Request)

{
  "message": "string"
}

## POST /login

Authenticates a user and returns an access token.

Request Body

{
  "email": "string",
  "password": "string"
}

Response Body (200 - OK)

{
  "access_token": "string"
}

Response Body (400 - Bad Request)

{
  "message": "string"
}

Response Body (401 - Unauthorized)

{
  "message": "Invalid Email/Password"
}

## GET /products

Retrieves a list of available menus.

Response Body (200 - OK)

[
  {
    "id": "number",
    "name": "string",
    "description": "string",
    "price": "number",
    "stock": "number",
    "imageUrl": "string",
    "CategoryId": "number"
  }
]

## GET /products/:id

Retrieves details of a specific menu item.

Response Body (200 - OK)

{
  "id": "number",
  "name": "string",
  "description": "string",
  "price": "number",
  "stock": "number",
  "imageUrl": "string",
  "CategoryId": "number"
}

Response Body (404 - Not Found)

{
  "message": "Product not found"
}

## POST /order

Creates a new order.

Request Body

{
  "items": [
    {
      "ProductId": "number",
      "quantity": "number"
    }
  ]
}

Response Body (201 - Created)

{
  "message": "Order created successfully",
  "order": {
    "id": "number",
    "UserId": "number",
    "totalPrice": "number",
    "status": "string"
  }
}

Response Body (400 - Bad Request)

{
  "message": "Items is required"
}

## POST /wishlist/:productId

Adds a product to the wishlist.

Response Body (201 - Created)

{
  "UserId": "number",
  "ProductId": "number"
}

## DELETE /wishlist/:productId

Removes a product from the wishlist.

Response Body (200 - OK)

{
  "message": "Wishlist deleted successfully"
}

## GET /ai/recommend

Retrieves AI-based recommended products.

Response Body (200 - OK)

[
  {
    "name": "string",
    "description": "string",
    "price": "number",
    "stock": "number",
    "imageUrl": "string",
    "CategoryId": "number"
  }
]

## POST /products

Request Body:

{
  "name": "string",
  "description": "string",
  "price": "number",
  "stock": "number",
  "imageUrl": "string",
  "CategoryId": "number"
}

Response Body (201 - Created):

{
  "message": "Product added successfully"
}

## PUT /products/:id

Request Body:

{
  "name": "string",
  "description": "string",
  "price": "number",
  "stock": "number",
  "imageUrl": "string",
  "CategoryId": "number"
}

Response Body (200 - OK):

{
  "message": "Product updated successfully"
}

## DELETE /products/:id

Response Body (200 - OK):

{
  "message": "Product deleted successfully"
}

## GET /orders

Response Body (200 - OK):

[
  {
    "id": "number",
    "UserId": "number",
    "totalPrice": "number",
    "status": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
]

## PUT /orders/:id/status

Request Body:

{
  "status": "string"
}

Response Body (200 - OK):

{
  "message": "Order status updated"
}

### GET /image

Mendapatkan satu gambar dari Unsplash berdasarkan query yang diberikan.

Request Query Parameters:

{
    "query": "string" 
}


Response Body (200 - OK):


{
    "imageUrl": "string" // URL gambar dari Unsplash
}


Response Body (400 - Bad Request):


{
    "message": "string"
}


Response Body (500 - Internal Server Error):


{
    "message": "Internal server error"
}
