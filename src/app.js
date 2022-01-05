import Express  from "express";
import dotenv from 'dotenv';
import path from "path";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import bankRouter from "./router/router";
import userRouter from "./router/user";

dotenv.config();
/*  Depositar 
    Retirar
    Consultar
    Authenticação

*/

mongoose.connect(
    process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
).then(
    () => {
        console.log(`DB is connected`)
    }
).catch((err) => {
    console.log(`something is wrong ${err}`)
});


const app = Express();
app.use(Express.json());
app.use(morgan("dev"));
app.use(Express.urlencoded({ extended: true }));
app.use(cors())
app.use("/api", bankRouter);
app.use("/api", userRouter);


const PORT = process.env.PORT || 3033;

app.listen(PORT, () => {
    console.log(`Server is running https://localhost:${PORT}`);
});