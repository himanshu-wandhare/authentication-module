require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const md5 = require("md5");

const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/userDB");

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = new mongoose.model("User",userSchema);

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {
    User.findOne({email: req.body.username}).then(foundedUser => {
        if(foundedUser) {
            const password = md5(req.body.password);
            if(foundedUser.password === password) {
                res.render("secrets");
            } else {
                res.send("<h1>Password is incorrect</h1>");
            }
        } else {
            res.send("User not found");
        }   
    }).catch(err => {
        console.log(err);
    })
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    const newUser = new User({
        email: req.body.username,
        password: md5(req.body.password)
    });

    newUser.save().then(() => {
        res.render("secrets");
    }).catch(err => {
        console.log(err);
    })
});

app.listen(process.env.PORT, () => {console.log("App is running on port 3000")});