# NODE JS REST API CRUD App using JWT

This is a blog posts application providing a REST

The entire application is contained within the `index.js` file.

## Install

    npm install

## Run the app

    npm start
    
## REST API

###### API URL https://blog-node-server-1.herokuapp.com/api
**********
### Request

`POST /user/register`

##### Payload

	{ 
        "name" : "admin",
        "email": "admin@gmail.com",
        "password": "admin@1212"
	}
	
**********
### Request

`POST /user/login`

##### Payload

	{ 
        "email": "admin@gmail.com",
        "password": "admin@1212"
	}
	
##### Response

    { 
        "status": "true",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDU0NjgxMjZjZDMzMTY5NGE5MjdhZSIsImlhdCI6MTYwNzg2NTk4MSwiZXhwIjoxNjA3ODY5NTgxfQ.cYFfnwVC6RcexC1aCtBKqc2Q8H0g1JH27IdHjQqiJD4"
    }
**********
### Request
`POST /posts/create`

`POST /posts/update`

`headers: {auth-token: ***}`

##### Payload

	{ 
        "title": "Lorem impsum",
        "description": "lorem impsum is simply a dummy",
        "featured_image": binary
	}    
	
**********
### Request
`GET /posts/get/:id`

`GET /posts/get`

`headers: {auth-token: ***}`    
**********

### Request
`DELETE /posts/delete`

`headers: {auth-token: ***}`

##### Payload

	{ 
        "id": <post_id>,
	}    
