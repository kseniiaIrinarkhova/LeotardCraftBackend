# Distinctiveness and Complexity
Backend server for LeotardCraft application. Provided opportunity to Create, Read, Update, and Delete information about users, their projects, fabrics, and rhinestones. Created using ***Typescript***, **Node.js**, **Express.js**, and **Mongoose** technologies.

# Technical documentation of the project
## Code specification
### Files structure:
- **dist** - directory with compiled file
    - *server.js* - compiled js file
- **src** - directory with main code files
    - **config** - directory for configuration files
        - *db.config.ts* - config for connection to MongoBD by Mongoose framework
    - **controllers** - directory for controllers
    - **modules** - directory for mongoose schemas for every data collections
    - **routes** - directory with routes
    - **types** - directory with TypeScript custom types
        - *main.d.ts* - file with custom types and interfaces that used in projects
    - *server.ts* - main code source file for server
- *.env.example* - exsample file with environmental variables
- *package.json* - main properties of project
### Main types and interfaces
Main types and interfaces that used in project located in `src/types/main.d.ts` file:
#### Interfaces

#### Types
 

## Installation
1. Clone repository. run `npm install` to get all dependencies
2. Create .env file according to .env.example structure. Add connection string to MongoDB database with your username/password. It is possible to create a free account in [MongoDB ](https://www.mongodb.com/) using **Try Free** option
3. To run dev scripts use command `npm run dev`


## API user guide
There are few API routes and operations:

# Author
Project prepared as a capstone project for **Software Engineering Bootcamp** at *Per Scholas* by [Kseniia Irinarkhova](https://www.linkedin.com/in/kseniia-irinarkhova/).

# Additional Resources
- [How to set up TypeScript with Node.js and Express](https://blog.logrocket.com/how-to-set-up-node-typescript-express/)
- [Easy MongoDB Mongoose Connection with TypeScript Nodejs and Express](https://thriveread.com/mongodb-mongoose-connection-with-typescript-nodejs-and-express/)
- [Interfaces vs Types in TypeScript](https://blog.logrocket.com/types-vs-interfaces-typescript/)
- [JWT Authentication in Typescript with Express](https://dev.to/juliecherner/authentication-with-jwt-tokens-in-typescript-with-express-3gb1)


