IDEA LAB ASSESMENT
Technology used
Nodejs, dotenv, jsonwebtoken, express, sequelize
I created schools management database where I have different roles e.g
1. Admin
2. Students
3. Teachere
 
I created a book collection and i protected the each routes. e.g 
To create a book you must log in as a teacher
To delete a book you must logged in as an admin
To update a book you must logged in as either admin or teacher



USERS
1. register users endpoints (POST)
http://localhost:6000/api/v1/users/register
Expected parameter
e.g
{
    "name": "Steve",
    "email": "steve@gmail.com",
    "password": "1234",
    "role" : "students"
}

2. login endpoints (POST)
http://localhost:6000/api/v1/users/login
Expected data
{
 "email": "steve@gmail.com",
    "password": "1234"
}

3. get all users endpoints (GET)
http://localhost:6000/api/v1/users/

BOOKS 
4. create books end poionts
http://localhost:6000/api/v1/books/
expected data
e.g
{
    "title": "Beginning",
    "author": "sach",
    "isbn": 55656
}

5. get all books endpoints 
METHOD: GET
http://localhost:6000/api/v1/books/

6. get single book endpoints
METHOD: GET
http://localhost:6000/api/v1/books/1
You must supply the ID 

7.update book endpoints
You must logged in as either Admin or Teacher and supply the book ID
METHOD: PUT
http://localhost:6000/api/v1/books/1

8. delete book endpoints
METHOD: DELETE
http://localhost:6000/api/v1/books/5
You must logged in as either Admin and supply the book ID
