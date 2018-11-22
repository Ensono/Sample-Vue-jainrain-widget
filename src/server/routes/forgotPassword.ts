import * as express from "express";
import { details } from "../helpers/details";

export const forgotPassword = express.Router();

forgotPassword.get("/", (req, res) => {
    res.render("forgotPassword", { details });
});

forgotPassword.post("/", (req, res) => {
    res.redirect("/forgotPasswordSuccess");
});
