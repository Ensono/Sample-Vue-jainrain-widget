import * as express from "express";

export const index = express.Router();

index.get("/", (req, res) => {
    res.redirect("/login");
});
