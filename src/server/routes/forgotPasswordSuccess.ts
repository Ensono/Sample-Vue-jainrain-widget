import * as express from "express";
import { details } from "../helpers/details";

export const forgotPasswordSuccess = express.Router();

forgotPasswordSuccess.get("/", (req, res) => {
    res.render("forgotPasswordSuccess", { details });
});
