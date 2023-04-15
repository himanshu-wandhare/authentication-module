require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

const saltRounds = 10;

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {
    User.findOne({email: req.body.username}).then(foundedUser => {
        if(foundedUser) {
            bcrypt.compare(req.body.password, foundedUser.password,(err,result) => {
                if(result === true) {
                    res.render("secrets");
                } else {
                    res.send("<h1>Password is incorrect</h1>");
                }
            });
        } else {
            res.send("User not found");
        }   
    }).catch(err => {
        console.log(err);
    });
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        const newUser = new User({
            email: req.body.username,
            password: hash
        });
    
        newUser.save().then(() => {
            res.render("secrets");
        }).catch(err => {
            console.log(err);
        });
    })
});

app.listen(process.env.PORT, () => {console.log("App is running on port 3000")});