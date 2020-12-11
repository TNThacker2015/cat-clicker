import express from "express";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.static(path.join(__dirname, "../../dist/")));
app.listen(8080, () => console.log("Server started!"));