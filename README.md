# Distinctiveness and Complexity
Backend server for LeotardCraft application. Provided opportunity to Create, Read, Update, and Delete information about users, their projects, fabrics, and rhinestones. Created using ***Typescript***, **Node.js**, **Express.js**, and **Mongoose** technologies.

# Technical documentation of the project
## Files structure:
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
## Main types and interfaces
Main types and interfaces that used in project located in `src/types/main.d.ts` file:
### Interfaces
Interfases mostly are used in Mongoose Schemas creation
- **IUser** - interface that provide information about User document in database
- **ICustomRequest** - interface for custom request in auth middleware
- **IUserTokenPayload** - interface for user token payload
- **IRhinestone** - interface that provide information about Rhinestone document in database
- **IFabric** - interface that provide information about Fabric document in database
- **IProject** - interface that provide information about Project document in database
- **IFilter** - interface for filter that could be used in schemas static methods 

### Types
 - *UserUpdatedData* - type that provide all possible fields for username update route
 - *ProjectRhinestone* - type that represents rhinestones related to project
 - *ProjectFabric* - type that represents fabrics related to project
 - *Note* - type that represents notes for project/rhinestone/fabric

### Enums
- *RhinestonesType* - enum for rhinestone types

# Installation
1. Clone repository. run `npm install` to get all dependencies
2. Create .env file according to .env.example structure. Add connection string to MongoDB database with your username/password. It is possible to create a free account in [MongoDB ](https://www.mongodb.com/) using **Try Free** option
3. To run dev scripts use command `npm run dev`


# API user guide
Common structure of succsessful response:
```
{
    data: [ object ],
    message: string (Format: "Seccess <METHOD>. <Message>")
}
```
Common sctucture of response with error:
```
{
    message: string (most common format: "Error <METHOD>. <Message>")
}
```
All requests, except for `/api/users/register` and `/api/users/login` have to contain authentication token in header.
```
header:
{
    'x-auth-token' : string
}
```
There are few API routes and operations:
## Users API
There are 2 API end points that are not require authentication:
1. ### Register a new user
- API end point : `/api/users/register`
- API method: `POST`
- request body: 
```
{
"username": string,
  "first_name": string,
  "last_name": string,
  "email" : string,
  "password": string
}
```
- response body:
```
{
  "data": [
    {
        "token": string
    }
  ],
  "message": "Success POST. User has beed created."
}
```
- possible errors:
```
{
  "message": "E11000 duplicate key error collection: LeotardCraft.users index: username_1 dup key: { username: \"test3\" }"
}
or
{
  "message": "E11000 duplicate key error collection: LeotardCraft.users index: email_1 dup key: { email: \"test@mail.com\" }"
}
or
{
  "message": "User validation failed: username: Username should not be empty!, email: Email should not be empty!, password: Password should not be empty!"
}
```
2. ### Log in user
- API end point : `/api/users/login`
- API method: `POST`
- request body: 
```
{
  "username": string,
  "password": string
}
```
- response body:
```
{
  "data": [
    {
      "token": string
    }
  ],
  "message": "Success POST. User secsessfuly logged in."
}
```
- possible errors:
```
{
  "message": "Error POST. Invalid Credentials"
}
```
### All other routes need authentication token
3. ### Get user information
- API end point : `api/users/account`
- API method: `GET`
- response body:
```
{
  "data": [
    {
      "_id": ObjectID,
      "username": string,
      "first_name": string,
      "last_name": string,
      "email": string,
      "__v": 0
    }
  ],
  "message": "Success GET. Get user information"
}
```
- possible errors:
```
{
  "errors": [
    {
      "name": "TokenExpiredError",
      "message": "jwt expired",
      "expiredAt": "2024-03-23T19:04:25.000Z"
    },
    {
      "message": "Token is not valid"
    }
  ]
}
```
4. ### Change user
- API end point : `/api/users/account`
- API method: `PATCH`
- request body: any of object properties:
```
{
"firstName": string,
"lastName": string,
"password" : string,
"email": string
}
```
- response body:
```
{
  "data": {
    "_id": ObjectID,
    "username": string,
    "first_name": string,
    "last_name": string,
    "email": string,
    "__v": 0
  },
  "message": "Success PATCH. User has been updated."
}
```
5. ### Delete user
- API end point : `/api/users/account`
- API method: `DELETE`
- response body:
```
{
  "data": [
     {
        "_id": ObjectID,
        "username": string,
        "first_name": string,
        "last_name": string,
        "email": string,
        "__v": 0
    }
  ],
  "message": "Succress DELETE. User has been deleted."
}
```
## Rhinestones API
All routes need authentication token.
1. ### Get All user's rhinestones
- API end point : `/api/stones`
- possible query selectors. Search was expect mentioned query selectors as  not case-sencetive substring of data from database:
```
?type=<string>&&color=<string>&&size=<string>
```
- API method: `GET`
- return object structure: 
```
{
  "data": [
    {
      "_id": ObjectID,
      "created_by": ObjectID,
      "type": string,
      "size": string,
      "color": string,
      "links": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "imgs": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "__v": 0
    }
  ],
  "message": "Success GET. All user's rhinestones"
}
```
- possible errors:
```
{
  "errors": [
    {
      "name": "JsonWebTokenError",
      "message": "invalid signature"
    },
    {
      "message": "Token is not valid"
    }
  ]
}
```
2. ### Create new rhinestone
- API end point : `/api/stones`
- API method: `POST`
- request body:  rhinestone type should be one of: `'Sew on'| 'HotFix' | 'No HotFix'` 
```
{
    {
  "type": string,
  "size": string,
  "color": string,
  "links"?: [
    {
      "url": string
    }
  ],
  "imgs"?: [
    {
      "url": string
    }
  ]
}

}
```
- response body:
```
{
  "data": [
    {
      "created_by": ObjectID (User ID),
      "type": string,
      "size": string,
      "color": string,
      "links": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "imgs": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "_id": ObjectID,
      "__v": 0
    }
  ],
  "message": "Success POST. Rhinestone has beed created."
}
```
- possible errors:
```
{
  "message": "Rhinestone validation failed: type: Property 'type' should be provided, size: Property 'size' should be provided, color: Property 'color' should be provided, links.0.url: Property 'url' should be provided for links, imgs.0.url: Property 'url' should be provided for images"
}
or
{
  "message": "Rhinestone validation failed: type: `hot` is not a valid enum value for path `type`."
}
```
3. ### Get rhinestone by ID
- API end point : `/api/stones/:id`
- API method: `GET`
- response body:
```
{
  "data": [
    {
      "_id": ObjectID,
      "created_by": ObjectID,
      "type": string,
      "size": string,
      "color": string,
      "links": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "imgs": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "__v": 0
    }
  ],
  "message": "Success GET. Rhinestone ID=<:id> information"
}
```
- possible errors:
```
{
  "message": "Error GET. There is no rhinestone with ID = <:id>"
}
```
4. ### Change rhinestone
- API end point : `api/stones/:id`
- API method: `PATCH`
- request body: Properties `links` and `img` - would be completely rewritten if they were mentioned in request boby.. Be shure to mentioned all object's that should be saved in database. Could be changed any of object properties:
```
{
    "type": string,
    "size": string,
    "color": string,
    "links": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
    "imgs": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
}
```
- response body:
```
{
  "data": [
    {
      "_id": ObjectID,
      "created_by": ObjectID,
      "type": string,
      "size": string,
      "color": string,
      "links": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "imgs": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "__v": 0
    }
  ],
  "message": "Success PATCH. Rhinestone has been updated."
}
```
- possible errors:
```
{
  "message": "Error PATCH. Current user did not create rhinestone with ID = <:id>"
}
```
5. ### Delete rhinestone
- API end point : `api/stones/:id`
- API method: `DELETE`
- response body:
```
{
  "data": [
    {
      "_id": ObjectID,
      "created_by": ObjectID,
      "type": string,
      "size": string,
      "color": string,
      "links": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "imgs": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "__v": 0
    }
  ],
  "message": "Success DELETE. Rhinestone has been udeleted."
}
```
- possible errors:
```
{
  "message": "Error DELETE. Current user did not create rhinestone with ID = <:id>"
}
```
6. ### Get all users rhinestones by type
- API end point : `/api/stones/types/:type`
- API method: `GET`
- response body:
```
{
  "data": [
   {
      "_id": ObjectID,
      "created_by": ObjectID,
      "type": string,
      "size": string,
      "color": string,
      "links": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "imgs": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "__v": 0
    }
  ],
  "message": "Success GET. All user's rhinestones with type = <:type>"
}
```

7. ### Get all users rhinestones by color
- API end point : `/api/stones/colors/:color`
- API method: `GET`
- response body:
```
{
  "data": [
   {
      "_id": ObjectID,
      "created_by": ObjectID,
      "type": string,
      "size": string,
      "color": string,
      "links": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "imgs": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "__v": 0
    }
  ],
  "message": "Success GET. All user's rhinestones with color = <:color>"
}
```
7. ### Get all users rhinestones by size
- API end point : `/api/stones/sizes/:size`
- API method: `GET`
- response body:
```
{
  "data": [
   {
      "_id": ObjectID,
      "created_by": ObjectID,
      "type": string,
      "size": string,
      "color": string,
      "links": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "imgs": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "__v": 0
    }
  ],
  "message": "Success GET. All user's rhinestones with size = <:size>"
}
```
## Fabrics API
All routes need authentication token.
1. ### Get All user's fabrics
- API end point : `/api/fabrics`
- possible query selectors. Search was expect mentioned query selectors as  not case-sencetive substring of data from database:
```
?type=<string>&&color=<string>
```
- API method: `GET`
- return object structure: 
```
{
  "data": [
    {
      "_id": ObjectID,
      "created_by": ObjectID,
      "type": string,
      "color": string,
      "links": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "imgs": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "__v": 0
    }
  ],
  "message": "Success GET. All user's fabrics"
}
```
- possible errors:
```
{
  "errors": [
    {
      "name": "JsonWebTokenError",
      "message": "invalid signature"
    },
    {
      "message": "Token is not valid"
    }
  ]
}
```
2. ### Create new fabric
- API end point : `/api/fabrics`
- API method: `POST`
- request body:   
```
{
    {
  "type": string,
  "color": string,
  "links"?: [
    {
      "url": string
    }
  ],
  "imgs"?: [
    {
      "url": string
    }
  ]
}

}
```
- response body:
```
{
  "data": [
    {
      "created_by": ObjectID (User ID),
      "type": string,
      "color": string,
      "links": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "imgs": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "_id": ObjectID,
      "__v": 0
    }
  ],
  "message": "Success POST. Fabric has beed created."
}
```
- possible errors:
```
{
  "message": "Fabric validation failed: type: Property 'type' should be provided, color: Property 'color' should be provided, links.0.url: Property 'url' should be provided for links, imgs.0.url: Property 'url' should be provided for images"
}

```
3. ### Get fabric by ID
- API end point : `/api/fabrics/:id`
- API method: `GET`
- response body:
```
{
  "data": [
    {
      "_id": ObjectID,
      "created_by": ObjectID,
      "type": string,
      "color": string,
      "links": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "imgs": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "__v": 0
    }
  ],
  "message": "Success GET. Fabric ID=<:id> information"
}
```
- possible errors:
```
{
  "message": "Error GET. There is no fabric with ID = <:id>"
}
```
4. ### Change fabric
- API end point : `api/fabrics/:id`
- API method: `PATCH`
- request body: Properties `links` and `img` - would be completely rewritten if they were mentioned in request boby.. Be shure to mentioned all object's that should be saved in database. Could be changed any of object properties:
```
{
    "type": string,
    "color": string,
    "links": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
    "imgs": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
}
```
- response body:
```
{
  "data": [
    {
      "_id": ObjectID,
      "created_by": ObjectID,
      "type": string,
      "color": string,
      "links": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "imgs": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "__v": 0
    }
  ],
  "message": "Success PATCH. Fabric has been updated."
}
```
- possible errors:
```
{
  "message": "Error PATCH. Current user did not create fabric with ID = <:id>"
}
```
5. ### Delete fabric
- API end point : `api/fabrics/:id`
- API method: `DELETE`
- response body:
```
{
  "data": [
    {
      "_id": ObjectID,
      "created_by": ObjectID,
      "type": string,
      "color": string,
      "links": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "imgs": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "__v": 0
    }
  ],
  "message": "Success DELETE. Fabric has been udeleted."
}
```
- possible errors:
```
{
  "message": "Error DELETE. Current user did not create fabric with ID = <:id>"
}
```
6. ### Get all users fabrics by type
- API end point : `/api/fabrics/types/:type`
- API method: `GET`
- response body:
```
{
  "data": [
   {
      "_id": ObjectID,
      "created_by": ObjectID,
      "type": string,
      "color": string,
      "links": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "imgs": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "__v": 0
    }
  ],
  "message": "Success GET. All user's fabrics with type = <:type>"
}
```

7. ### Get all users fabrics by color
- API end point : `/api/fabrics/colors/:color`
- API method: `GET`
- response body:
```
{
  "data": [
   {
      "_id": ObjectID,
      "created_by": ObjectID,
      "type": string,
      "color": string,
      "links": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "imgs": [
        {
          "url": string,
          "_id": ObjectID
        }
      ],
      "__v": 0
    }
  ],
  "message": "Success GET. All user's fabrics with color = <:color>"
}
```
## Projects API
All routes need authentication token.
1. ### Get All users projects
- API end point : `/api/projects`
- API method: `GET`
- response body:
```
{
  "data": [
    {
      "created_by": ObjectID,
      "title": string,
      "rhinestones": [
        {
          "rhinestone_id": ObjectID,
          "amount": 10,
          "_id": ObjectID,
          "notes": [
             {
                "context": string,
                "created_date": Date,
                "_id": ObjectID
            }
            ]
        }
        ],
      "fabrics": [
        {
          "fabric_id": ObjectID,
          "quantity": 12,
          "_id": ObjectID,
          "notes": [
             {
                "context": string,
                "created_date": Date,
                "_id": ObjectID
            }
            ]
        }
        ],
      "notes": [
        {
          "context": string,
          "created_date": Date,
          "_id": ObjectID
        }
        ],
      "imgs": [
        {
          "url": string,
          "_id": ObjectID
        }
        ],
      "_id": ObjectID,
      "__v": 0
    }
  ],
  "message": "Success GET. All user's projects"
}
``` 

2. ##### Create new project
- API end point : `/api/projects`
- API method: `POST`
- request body: rhinestones, fabric, notes, imgs - optional properties
```
{
  "title": string,
  "rhinestones": [
    {
      "rhinestone_id": ObjectID,
      "amount":  number,
      "notes": [
        {
            "context": string,
            "created_date": date
        }
        ]
    }],
      "fabrics": [
        {
          "fabric_id": ObjectID,
          "quantity": number,
          "notes": [
            {
                "context": string,
                "created_date": date
            }
            ]
        }],
      "notes": [
        {
            "context": string,
            "created_date": date
        }
        ],
      "imgs": [
        {
          "url": string
        }
        ]
}
```
- response body:
{
  "data": [
    {
      "created_by": ObjectID,
      "title": string,
      "rhinestones": [
        {
          "rhinestone_id": ObjectID,
          "amount": 10,
          "_id": ObjectID,
          "notes": [
             {
                "context": string,
                "created_date": Date,
                "_id": ObjectID
            }
            ]
        }
        ],
      "fabrics": [
        {
          "fabric_id": ObjectID,
          "quantity": 12,
          "_id": ObjectID,
          "notes": [
             {
                "context": string,
                "created_date": Date,
                "_id": ObjectID
            }
            ]
        }
        ],
      "notes": [
        {
          "context": string,
          "created_date": Date,
          "_id": ObjectID
        }
        ],
      "imgs": [
        {
          "url": string,
          "_id": ObjectID
        }
        ],
      "_id": ObjectID,
      "__v": 0
    }
  ],
  "message": "Success POST. Project has beed created."
}
- possible errors:
```
{
  "message": "Project validation failed: rhinestones.0.rhinestone_id: Cast to ObjectId failed for value \"\" (type string) at path \"rhinestone_id\" because of \"BSONError\", fabrics.0.fabric_id: Cast to ObjectId failed for value \"\" (type string) at path \"fabric_id\" because of \"BSONError\", title: Property 'title' should be provided, notes.0.created_date: Property 'created_date' should be provided, notes.0.context: Property 'context' should be provided, imgs.0.url: Property 'url' should be provided for images"
}
```
3. ##### Get project by ID
- API end point : `/api/projects/:id`
- API method: `GET`
- return object structure:
```
{
  "data": [
    {
      "_id": ObjectID,
      "created_by": ObjectID,
      "title": string,
      "rhinestones": [
        {
          "rhinestone_id": ObjectID,
          "amount": 10,
          "_id": ObjectID,
          "notes": [
             {
                "context": string,
                "created_date": Date,
                "_id": ObjectID
            }
            ]
        }
        ],
      "fabrics": [
        {
          "fabric_id": ObjectID,
          "quantity": 12,
          "_id": ObjectID,
          "notes": [
             {
                "context": string,
                "created_date": Date,
                "_id": ObjectID
            }
            ]
        }
        ],
      "notes": [
        {
          "context": string,
          "created_date": Date,
          "_id": ObjectID
        }
        ],
      "imgs": [
        {
          "url": string,
          "_id": ObjectID
        }
        ],
      "__v": 0
    }
  ],
 "message": "Success GET. Project ID=65ff503d94844bc93db669aa information"
}
```
- possible errors:
```
{
  "message": "Error GET. Current user did not create project with ID = <:id>"
}
```
4. ##### Change project
- API end point : `/api/projects/:id`
- API method: `PATCH`
- request body: All properties would be completely rewritten if they were mentioned in request boby. Be shure to mentioned all object's that should be saved in database. Could be changed any of object properties::
```
the same as for POST method
```
- response body
```
{
    "data": [{
        ... the same as for POST method
    }],
    "message": "Success PATCH. Project has been updated."
}
```
- possible errors:
```
{
  "message": "Error PATCH. Current user did not create project with ID = <:id>"
}
```
5. ##### Delete project
- API end point : `/api/projects/:id`
- API method: `DELETE`
- response body
```
{
    "data": [{
        ... the same as for POST method
    }],
    "message": "Success DELETE. Project has been deleted."
}
```
- possible errors:
```
{
  "message": "Error DELETE. Current user did not create project with ID = <:id>"
}
```


# Author
Project prepared as a capstone project for **Software Engineering Bootcamp** at *Per Scholas* by [Kseniia Irinarkhova](https://www.linkedin.com/in/kseniia-irinarkhova/).

# Additional Resources
- [How to set up TypeScript with Node.js and Express](https://blog.logrocket.com/how-to-set-up-node-typescript-express/)
- [Easy MongoDB Mongoose Connection with TypeScript Nodejs and Express](https://thriveread.com/mongodb-mongoose-connection-with-typescript-nodejs-and-express/)
- [Interfaces vs Types in TypeScript](https://blog.logrocket.com/types-vs-interfaces-typescript/)
- [JWT Authentication in Typescript with Express](https://dev.to/juliecherner/authentication-with-jwt-tokens-in-typescript-with-express-3gb1)


