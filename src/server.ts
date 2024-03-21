import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.config";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const connectionString: string = process.env.ATLAS_URI || "";

//Middleware
//support for JSON data in the payload
app.use(express.json());
//parse incoming requests with urlencoded payloads and is based on body-parser
app.use(express.urlencoded({ extended: false }));

//Routes

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

//Errors


// connecting to Mongodb and starting the server
const startDB = async () => {
    try {
        await connectDB(connectionString);
        console.log('Mongodb is connected!!!')
        app.listen(port, () => {
            console.log(`[server]: Server is running at http://localhost:${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

startDB();


