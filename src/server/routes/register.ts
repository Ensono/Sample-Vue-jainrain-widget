import * as express from "express";
import { details } from "../helpers/details";

export const register = express.Router();

register.get("/", (req, res) => {
    res.render("register", { details });
});

register.post("/", (req, res) => {
    res.render("stub");
});
