import express from "express";
import type { Request, Response } from "express";
import fs from "fs";
import path from "path";

const app = express();

app.disable("X-Powered-By");
const distFolder = path.join(__dirname, "../../dist/");

// MIDDLEWARE
app.use(express.static(distFolder));

// REQUEST HANDLER

app.get("/foo", (req, res) => {
	throw new Error("bruh");
});
app.get("*", (req, res) => res.status(404).sendFile(path.join(distFolder, "./404.html")));

// ERROR HANDLER

app.use((err: Error, req: Request, res: Response, next: (err: Error) => void) => {
	res.header("X-Error-Info", err.message)
	console.error(err.stack);
	res.status(500)
		.sendFile(path.join(distFolder, "./500.html"));
});

app.listen(8080, () => console.log("Server started!"));