# Online_Shop
MERNSTACK Ecommerce Website by implementing redux tool-kit
This project is part of my MERN Stack From Scratch | eCommerce Platform course. It is a full-featured shopping cart with PayPal & credit/debit payments.

# Features
# Usage
# Env Variables
# Install Dependencies (frontend & backend)
# Run

# Features
Full featured shopping cart,
Product reviews and ratings,
Top products carousel,
Product pagination,
Product search feature,
User profile with orders,
Admin product management,
Admin user management,
Admin Order details page,
Mark orders as delivered option,
Checkout process (shipping, payment method, etc),
PayPal / credit card integration,
Database seeder (products & users),
Usage,
Create a MongoDB database and obtain your MongoDB URI - MongoDB local,
Create a PayPal account and obtain your Client ID - PayPal Developer,
Env Variables,
Rename the .env.example file to .env and add the following,

NODE_ENV = development,
PORT = 8000,
MONGO_URI = your mongodb uri,
JWT_SECRET = 'Enter any thing for security',
PAYPAL_CLIENT_ID = your paypal client id,
PAGINATION_LIMIT = 8,
Change the JWT_SECRET and PAGINATION_LIMIT to what you want,

Install Dependencies (frontend & backend)
npm install
cd frontend
npm install
Run

# Run frontend (:3000) 
npm start

# Run backend only on (:8000)
npm run server-dev
