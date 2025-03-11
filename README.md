# MERN BOOK SEARCH-ENGINE

## Description

MERN Book Search Engine is a full-stack web application that allows users to search for books using the Google Books API, save books to their account, and manage their saved books. Originally built with a RESTful API, the application has been refactored to use GraphQL with Apollo Server for more efficient and scalable data management.

## Table of Contents

- [Installation]
- [Usage]
- [Technologies]
- [License]
- [Contributing]
- [Questions]
- [Links]

## Installation

To install and set up the application locally, follow these steps:

## Clone the Repository:

git clone https://github.com/YOUR_GITHUB_USERNAME/mern-book-search-engine.git
cd mern-book-search-engine

## Install Dependencies:

npm install
cd client && npm install

## Set Up Environment Variables:
Create a .env file in the root directory and add:

MONGODB_URI=<Your MongoDB Atlas Connection String>
SECRET=<Your JWT Secret>

Run the Application (Development Mode):

npm run develop

The app should now be running at http://localhost:3000.

Usage

Users can search for books via the Google Books API.

Users can sign up/log in to save books to their account.

Saved books can be viewed, managed, and removed.

Authentication is handled via JWT.

The backend has been refactored from RESTful API to GraphQL with Apollo Server.

## Technologies

Frontend: React, Apollo Client

Backend: Node.js, Express.js, GraphQL with Apollo Server

Database: MongoDB Atlas

Authentication: JSON Web Tokens (JWT)

Deployment: Render

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Contributing

Contributions are welcome! Feel free to fork the repository, create a feature branch, and submit a pull request.

## Questions

If you have any questions about the project, feel free to reach out via GitHub:

GitHub: Shelia Bradford [https://github.com/SBradford4/](https://github.com/SBradford4/)

## Links

Live Application: Deployed Application

GitHub Repository: https://github.com/SBradford4/18MERN-Book-Search-Engine

