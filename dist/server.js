"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_config_1 = __importDefault(require("./config/db.config"));
//routes
const user_route_1 = __importDefault(require("./routes/user.route"));
const rhinestone_route_1 = __importDefault(require("./routes/rhinestone.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const connectionString = process.env.ATLAS_URI || "";
//Middleware
//support for JSON data in the payload
app.use(express_1.default.json());
//parse incoming requests with urlencoded payloads and is based on body-parser
app.use(express_1.default.urlencoded({ extended: false }));
//Routes
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
//routes related with user information
app.use('/api/users', user_route_1.default);
//routes related with rhinestones
app.use('/api/stones', rhinestone_route_1.default);
//Errors
// connecting to Mongodb and starting the server
const startDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_config_1.default)(connectionString);
        console.log('Mongodb is connected!!!');
        app.listen(port, () => {
            console.log(`[server]: Server is running at http://localhost:${port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
startDB();
