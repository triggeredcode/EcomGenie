
# EcomGenie

EcomGenie is a web application that allows you to import products from various sources and display them on a user-friendly interface.

## UI

 # Homepage
<details>
  <summary> Image</summary>
  <img src="product_images/homepage.png" alt="HomePage" width="50%">
</details>

# Filters
<details>
  <summary> Image</summary>
  <img src="product_images/product_filters.png" alt="Product-Filters" width="50%">
</details>

# ChatBot
<details>
  <summary> Image</summary>
  <img src="product_images/shopping_assistant.png" alt="Shopping-Assistant" width="50%">
</details>


## Table of Contents

- [EcomGenie](#ecomgenie)
  - [UI](#ui)
  - [Table of Contents](#table-of-contents)
  - [Download](#download)
  - [Environment Variables](#environment-variables)
  - [Setup](#setup)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Running the Application](#running-the-application)
  - [Import Products](#import-products)
  - [Contributing](#contributing)
  - [License](#license)

## Download

To get started, download the project repository from the following link:

[Download Repository](https://github.com/triggeredcode/EcomGenie)

## Environment Variables

Before running the application, you need to set up the following environment variables:

- `SCRAPER_API_KEY`: Your Scraper API key ( [Sign up](https://docs.scraperapi.com/nodejs#:~:text=If%20you%20haven%E2%80%99t%20signed%20up%20for%20an%20account%20yet%2C%20then%20sign%20up%20for%20a%20free%20trial%20here%20with%205%2C000%20free%20API%20credits!))
- `GROQ_API_KEY`: Your Groq API key. ( [Sign up](https://console.groq.com/?_gl=1*q5gy4q*_gcl_au*MTUyMTY0Mjc0My4xNzI2MTU2MTA0*_ga*NjkzOTAyMTg5LjE3MjYxNTYxMDQ.*_ga_4TD0X2GEZG*MTcyODI4MTgzOC4zLjEuMTcyODI4MTg3NC4yNC4wLjA.) )

You can set these variables in a `.env` file at the root of the project.

## Setup

### Backend

1. **Navigate to the backend directory:**
   ```sh
   cd backend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

### Frontend

1. **Navigate to the frontend directory:**
   ```sh
   cd frontend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

## Running the Application

1. **Start the backend server:**
   ```sh
   cd backend
   node index.js
   ```

2. **Start the frontend development server:**
   ```sh
   cd frontend
   npm run dev
   ```

3. **Visit the application:**
   Open your web browser and go to `http://localhost:5173` to see the running application.

## Import Products

You can import up to 5 products using the provided interface. Simply add the product details, and they will be displayed on the application. Some data is already hardcoded for you. On the right side, you will find a chatbot to interact with and help you choose the right product.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you find any bugs or have suggestions for improvements.

## License
