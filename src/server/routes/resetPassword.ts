import * as express from "express";
import { details } from "../helpers/details";

export const resetPassword = express.Router();

resetPassword.get("/", (req, res) => {
    res.render("resetPassword", { details });
});

resetPassword.post("/", (req, res) => {
    res.render("stub");
});
