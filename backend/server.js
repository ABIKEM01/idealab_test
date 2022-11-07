// //load env
import dotenv from "dotenv";
dotenv.config();

import Sequelize from 'sequelize'
import express from "express";
import cors from "cors";
import morgan from "morgan";
import UserRoute from "./routes/usersRoute.js";
import BooksRoute from "./routes/bookRoutes.js";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "40mb" }));

app.use("/api/v1/users", UserRoute);
app.use("/api/v1/books", BooksRoute);


const sequelizeConnection = new Sequelize('idealab_assignment', 'root', '', { host: 'localhost', dialect: 'mysql', operatorAliases: false, });
//const sequelize//Connection = new Sequelize(process.env.DATABASE, 'root', '', {host: 'localhost', dialect: 'mysql', operatorAliases: false});
console.log('root', 'username')
console.log(process.env.DB_DATABASE, 'database')
export default sequelizeConnection;

sequelizeConnection.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

global.sequelize = sequelizeConnection

app.get("/", (req, res) => {
    res.send("welcome to idealab assesment/test ");
});
const port = 6000
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("server is running");
});
