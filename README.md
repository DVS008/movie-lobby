# Movie Lobby API

### Endpoints


1. **User Registration**

    - **URL**: `api/auth/register`
    - **Method**: `POST`
    - **Description**: This endpoint allows a new user to register. The user provides a username, email, password, and role. Upon successful registration, the password is hashed.
    - **Request Body**:
      ```json
      {
         "username": "adminUser",
         "email": "admin@example.com",
         "password": "adminpassword",
         "role": "admin"
      }
      ```
    - **Response**:
      ```json
      {
         "message": "User registered successfully"
      }
      ```

2. **Generate Token**

    - **URL**: `api/auth/generate-token`
    - **Method**: `POST`
    - **Description**: This endpoint allows an existing user to log in. The user provides their email and password. Upon successful authentication, a JWT token is generated and returned.
    - **Request Body**:
      ```json
      {
         "email": "admin@example.com",
         "password": "adminpassword"
      }
      ```
    - **Response**:
      ```json
      {
         "token": "your_jwt_token"
      }
      ```



3. **List Movies**

    - **URL**: `api/movies`
    - **Method**: `GET`
    - **Description**: This endpoint retrieves a list of all movies.
    - **Response**:
      ```json
      [
         {
            "_id": "676e9f1461835b7be5ac825c",
            "title": "The Matrix",
            "genre": "Sci-Fi",
            "rating": 9,
            "streamingLink": "https://example.com/matrix"
         }
      ]
      ```

4. **Search Movies**

    - **URL**: `api/movies/search`
    - **Method**: `GET`
    - **Description**: This endpoint searches for movies based on query parameters.
    - **Request Parameters**:
      - `query`: The search query string title or genre, title and genre.
    - **Response**:
      ```json
      [
         {
        "_id": "676fb2b5b2dd6532e86fa382",
        "title": "Parasite3",
        "genre": "Thriller",
        "rating": 8.6,
        "streamingLink": "https://example.com/parasite"
        }
      ]
      ```

5. **Add Movie**

    - **URL**: `api/movies/add`
    - **Method**: `POST`
    - **Description**: This endpoint allows an admin to add a new movie.
    - **Request Body**:
      ```json
        {
            "_id": "676fea1735d50e0bb04197fb",
            "title": "Parasite2",
            "genre": "Thriller",
            "rating": 8.6,
            "streamingLink": "https://example.com/parasite",
        }
      ```
    - **Response**:
      ```json
        {
            "_id": "67716ac250f37e6ce040c7e5",
            "title": "Parasite3",
            "genre": "Thriller",
            "rating": 8.6,
            "streamingLink": "https://example.com/parasite"
        }
      ```

6. **Update Movie**

    - **URL**: `api/movies/:id`
    - **Method**: `PUT`
    - **Description**: This endpoint allows an admin to update an existing movie by its ID.
    - **Request Body**:
      ```json
        {
            "title": "Parasite3",
            "genre": "Thriller",
            "rating": 8.6,
            "streamingLink": "https://example.com/parasite"
        }
      ```
    - **Response**:
      ```json
      
        {
            "_id": "67716ac250f37e6ce040c7e5",
            "title": "Parasite3",
            "genre": "Thriller",
            "rating": 8.6,
            "streamingLink": "https://example.com/parasite"
        }
      ```

7. **Delete Movie**

    - **URL**: `api/movies/:id`
    - **Method**: `DELETE`
    - **Description**: This endpoint allows an admin to delete a movie by its ID.
    - **Response**:
      ```json
      {
         "message": "Movie deleted successfully"
      }
      ```




## Setup Instructions

### Prerequisites
Install these 
- Node.js (v14 or higher)
- MongoDB(8.0.0)
- Postman


### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/dvs008/movie-lobby.git
    cd movie-lobby
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root directory
    - Add the following configuration:
      ```env
      PORT=3000
      MONGODB_URI="mongodb://127.0.0.1:27017/dbconnect"
      JWT_SECRET='your_secure_random_string_here'
      ```

4. Database Setup:
    - Install MongoDB Compass
    - Use connection string: `mongodb://127.0.0.1:27017/dbconnect`
    - Create database `dbconnect` with collections:
      - `movieLobby`
      - `users`
      Import the collection provided here in JSON format.


5. Start MongoDB Service:
    - Open Admin Terminal (Win + X)
    - Run command:
      ```bash
      net start MongoDB
      ```
6. Run the application:
    ```bash
    npm start
    ```
Import the collection provided here in JSON format with Postman to test the end points.

7. To run tests:
    ```bash
    npm test
    ```