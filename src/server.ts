import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.config";
import cors from "cors"

//routes
import userRoutes from './routes/user.route';
import stoneRoutes from './routes/rhinestone.route';
import fabricRoutes from './routes/fabric.route';
import projectRoutes from './routes/project.route';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const connectionString: string = process.env.ATLAS_URI || "";

//Middleware
//support for JSON data in the payload
app.use(express.json());
//parse incoming requests with urlencoded payloads and is based on body-parser
app.use(express.urlencoded({ extended: false }));
//CORS
app.use(cors());

//Routes

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

//routes related with user information
app.use('/api/users', userRoutes);
//routes related with rhinestones
app.use('/api/stones', stoneRoutes);
//routes related with fabric
app.use('/api/fabrics', fabricRoutes);
//routes related with project
app.use('/api/projects', projectRoutes);

//Errors


// connecting to Mongodb and starting the server
const startDB = async () => {
    try {
        await connectDB(connectionString);
        console.log('[database]: Mongodb is connected.')
        app.listen(port, () => {
            console.log(`[server]: Server is running.`);
        })
    } catch (error) {
        console.log(error);
    }
}

startDB();


