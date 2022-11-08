const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const hbs = require("hbs");
const { supportsColor } = require("supports-color");
require("./db/con");
const Register = require("./models/registers");

const static_path = path.join(__dirname, "../public");
const templatep = path.join(__dirname, "../templates/views");
const partialp = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templatep);
hbs.registerPartials(partialp);

app.get('/', (req, res) => {
    res.render("index");
    console.log("you are now in index page");
});

app.get('/login', (req, res) => {
    res.render("login");
    console.log("You are now in logn page");
});

app.get("/register",(res, req)=>{
    res.render("register");
    res.send(req.body.name);
});

app.post("/register", async (req, res)=>{
    try{
        const registerEmployee = new Register({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender,
            address: req.body.address,
            phone: req.body.phone
        });
        const registered = await registerEmployee.save();
        res.status(201);
        res.redirect("https://kaisekare.tech");
    }
    catch(error){
        res.status(400).send("Error");
    }
});

app.post("/login", async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const usermail = await Register.findOne({ email: email});

        if(!usermail){
            res.status(400).send("email not found");
        }
        else if(usermail.password !== password)
        res.send("password are not matching");
        else
        res.status(200).redirect("https://kaisekare.tech");

        console.log(`Your email ${email} and password is ${password}`);
    } catch (error) {
        res.status(400).send("invalid Email")
    }
});

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});