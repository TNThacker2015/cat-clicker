"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
app.disable("X-Powered-By");
const distFolder = path_1.default.join(__dirname, "../../dist/");
// MIDDLEWARE
app.use(express_1.default.static(distFolder));
// REQUEST HANDLER
app.get("/foo", (req, res) => {
    throw new Error("bruh");
});
app.get("*", (req, res) => res.status(404).sendFile(path_1.default.join(distFolder, "./404.html")));
// ERROR HANDLER
app.use((err, req, res, next) => {
    res.header("X-Error-Info", err.message);
    console.error(err.stack);
    res.status(500)
        .sendFile(path_1.default.join(distFolder, "./500.html"));
});
app.listen(8080, () => console.log("Server started!"));
