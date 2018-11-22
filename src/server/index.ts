import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import { forgotPassword } from "./routes/forgotPassword";
import { forgotPasswordSuccess } from "./routes/forgotPasswordSuccess";
import { index } from "./routes/index";
import { login } from "./routes/login";
import { register } from "./routes/register";
import { resetPassword } from "./routes/resetPassword";

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "../app")));

app.use("/", index);
app.use("/login", login);
app.use("/register", register);
app.use("/forgotPassword", forgotPassword);
app.use("/forgotPasswordSuccess", forgotPasswordSuccess);
app.use("/resetPassword", resetPassword);

app.listen(5000, () => {
    console.log("Server up and running");
});
