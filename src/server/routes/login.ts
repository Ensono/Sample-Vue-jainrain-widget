import * as express from "express";
import { details } from "../helpers/details";

export const login = express.Router();

login.get("/", (req, res) => {
    res.render("login", { details });
});

login.post("/", (req, res) => {
    res.render("stub");
});
