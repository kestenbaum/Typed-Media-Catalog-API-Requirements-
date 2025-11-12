import express from "express";
import { Request, Response } from "express";

import * as dotenv from 'dotenv';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }));
app.get("/", (req: Request, res: Response) => {
    res.send("test")
})

app.listen(PORT, () => {
    console.log(`Server listen port: ${PORT}`)
})