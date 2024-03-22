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
        - *fabric.controller.ts* - controller for fabric entity
        - *project.controller.ts* - controller for project entity
        - *rhinestone.controller.ts* - controller for rhinestone entity
        - *user.controller.ts* - controller for user entity
    - **modules** - directory for mongoose schemas for every data collections
        - *Fabric.model.ts* - model schema for fabric entity
        - *Project.model.ts* - model schema for project entity
        - *Rhinestone.model.ts* - model schema for rhinestone entity
        - *User.model.ts* - model schema for user entity
    - **middleware** - direcrory for server middleware
        - *auth.ts* - middleware related to user authentication
    - **routes** - directory with routes
        - *fabric.route.ts* - routes for working with fabric entity
        - *project.route.ts* - routes for working with project entity
        - *rhinestone.route.ts* - routes for working with rhinestone entity
        - *user.route.ts* - routes for working with user entity
    - **services** - directory that contains methods that are used by controllers to work with models (MVC approach)
        - *fabric.service.ts* - services for working with fabric entity
        - *project.service.ts* - services for working with project entity
        - *rhinestone.service.ts* - services for working with rhinestone entity
        - *user.service.ts* - services for working with user entity
    - **types** - directory with TypeScript custom types
        - *main.d.ts* - file with custom types and interfaces that used in projects
    - **utils** - dirrectory for util functions
        - *error.util.ts* - fucntions that provide error string to response object
    - *server.ts* - main code source file for server
- *.env.example* - exsample file with environmental variables
- *package.json* - main properties of project
### Main types and interfaces
Main types and interfaces that used in project located in `src/types/main.d.ts` file:
#### Interfaces
Interfases mostly are used in Mongoose Schemas creation
- **IUser** - interface that provide information about User document in database
- **ICustomRequest** - interface for custom request in auth middleware
- **IUserTokenPayload** - interface for user token payload
- **IRhinestone** - interface that provide information about Rhinestone document in database
- **IFabric** - interface that provide information about Fabric document in database
- **IProject** - interface that provide information about Project document in database
- **IFilter** - interface for filter that could be used in schemas static methods 

#### Types
 - *UserUpdatedData* - type that provide all possible fields for username update route
 - *ProjectRhinestone* - type that represents rhinestones related to project
 - *ProjectFabric* - type that represents fabrics related to project
 - *Note* - type that represents notes for project/rhinestone/fabric

#### Enums
- *RhinestonesType* - enum for rhinestone types

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


