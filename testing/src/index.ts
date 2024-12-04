import express, { Request, Response, Express } from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import rootRouter from "./routes";

const app: Express = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//routes
app.use("/", rootRouter);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
});
