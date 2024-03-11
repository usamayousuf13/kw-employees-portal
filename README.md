# kw-todo-app

A todo tasks management app with role-based user controls. Uses NestJS with typescript as a backend-app framework and MongoDB as a primary database

### DISCLAIMER:
I have used a NestJS boilerplate that I created a couple of years back. Read more about it in my medium article:
https://medium.com/@usamayousuf_62526/use-nest-js-framework-for-your-next-node-js-project-847bac082edd

Please also skim through the README file of the boilerplate GitHub repo:
https://github.com/usamayousuf13/nestjs-boilerplate


## Pre-requisites

* Make sure you have the latest version of nodejs installed on your system (https://nodejs.org/en/download/)
* We are using MongoDB Atlas (cloud) https://www.mongodb.com/atlas/database
* Any code editor, I prefer using VScode

### .env file

Create a file namely .env in the project root and add the following content to it:

```bash
MONGO_URL=mongodb+srv://<username>:<password>@dev-cluster.ufdv49w.mongodb.net/todoApp?retryWrites=true&w=majority&appName=dev-cluster
APP_PORT=3001
```

* Do not forget to substitute credentials (username and password) in MONGO_URL, which are already shared via email

## Installation

```bash
$ npm install
```

## Running seed data script
* As mentioned in the requirements of the coding challenge, we have a seed data script that can be run using the following command:

```bash
$ npm run seed
```
* This script will create a new user in DB:
```
{
    "username": "admin",
    "password": "adminPassword",
    "role": "Admin",
}
```
* Currently it just creates a new user in DB, validation and error handling can be done later

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

* Due to limited time, unit and integration tests are not covered.

### Project Structure takeaways

* All application code resides in /src directory
* We have separate folders for each module or we can say components of the application
* Each module has its separate service, controller, and module file
* '/util/' directory inside /src is created to store all utilities such as helper module, seed script
* /mongoose directory has all the schemas that are used in our application
* Swagger UI is integrated with the project and can be accessed after running the application on:
```http://localhost:3001/api```


### Notes and thought process

* I have tried to fulfill all the requirements that were listed in the coding challenge, but you might see 'any' type in code somewhere. I acknowledge it and they are left due to time constraints. 
* I have integrated Pino logger, it's a lightweight, easy-to-use, JSON and ElasticSearch compatible logger for nodejs. Also it's my favorite ;)
* Separate Environments for prod and dev can be configured later
* Unit and integration tests are missing but we can use Jest with SuperTest, which is recommended by nestJS
* File naming conventions are used throughout the project and are made consistent everywhere
* I have put some extra effort into swagger UI, so that user can execute APIs easily. Created separate dtos (src/users/dto) for that
* I have tried to make the project structure simple and self-explanatory, and also followed best practices and recommended packages of nestJS
* Would love to hear feedback about it :)


### Application Flow

* Admin user will be created in DB when seed script is executed
* Admin user can login using /users/login api 
* Password is not encrypted and is stored in simple text format. Bcrypt or crypto npm packages can be used to secure passwords
* /users/login is a simple API that matches username and password provided in req.body
* /users/send-invite/:username API can be used to generate a new invite token. It returns token as a response which can be used to register new user
* Without invitation token new user cannot be registered (Sign-ups should be Invite-only)
* /users/send-invite/:username API can only be used by a user with role=Admin. Other roles wouldn't be able to send invite
* /users/register?invitationToken=token API is used to register a new user. Takes invitation token as a query param and user object in req.body
* invitation token have an expiration period of 1 hour which is also validated in /users/register API
* 'b. Resending the invite should reset the expiration date.' - Not implemented due to separate invites collection and option to create multiple invites by a single admin
* /tasks have all CRUD Operations 
* GET /tasks:username API takes offset and limit as params to be used for pagination. Username is used to fetch selected user's tasks

