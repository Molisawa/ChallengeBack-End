var express = require("express");
var nodemailer = require("nodemailer");
var app = express();

app.use(express.json())

var mysql = require("mysql");

// create a mysql connection to localhost
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "challenge"
  });

var email = "";

//a function that saves name, age, address and date to the database throught the connection
app.post("/save-data", function(req, res) {
    var name = req.body.name;
    var age = req.body.age;
    var address = req.body.address;
    var date = req.body.date;

    console.log(req.body);
   
    var sql = "INSERT INTO `datos` (`name`, `age`, `address`, `date`) VALUES ('" + name + "', '" + age + "', '" + address + "', '" + date + "');";
    connection.query(sql, function(err, result) {
        if (err) {
            console.log(err);
            res.send("Error");
        } else {
            console.log("Success");
            res.send("Success");
        }
    });
});


// a function that obtains the data from the database and sends it to the client
app.get("/get-data", function(req, res) {
    var sql = "SELECT * FROM `datos`;";
    connection.query(sql, function(err, result) {
        if (err) {
            console.log(err);
            res.send("Error");
        } else {
            console.log("Success");
            res.json(result);
        }
    });
});

app.post("/send-form", function(req, res) {
    email = req.body.email;
    var transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "ernestobvc1@gmail.com",
            pass: "apguupujjztxdtfj"
        }
    }); 
    var mailOptions = {
        from: "Remitente",
        to: email,
        subject: "Que tal! Por favor llena este formulario",
        text: "http://localhost:4200/form"
    };   
    
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            console.log("Formulario enviado!");
            res.status(200).jsonp(req.body);
        }
    });
});
    


app.post("/promo-email", (req, res) => {
    var transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "ernestobvc1@gmail.com",
            pass: "apguupujjztxdtfj"
        }
    }); 
    var mailOptions = {
        from: "Remitente",
        to: email,
        subject: "Que tal!",
        text: "¡Felicidades eres acredor a una promoción! Nos comunicaremos contigo para mas detalles."
    };   
    
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            console.log("Email enviado!");
            res.status(200).jsonp(req.body);
        }
    });
});


app.post("/default-email", (req, res) => {
    var transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "ernestobvc1@gmail.com",
            pass: "apguupujjztxdtfj"
        }
    }); 
    var mailOptions = {
        from: "Remitente",
        to: email,
        subject: "Que tal!",
        text: "Gracias por llenar nuestro formulario. :)"
    };

    
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            console.log("Default email enviado!");
            res.status(200).jsonp(req.body);
        }
    });
});

app.listen(3000, () => {
    console.log("Servidor en localhost:3000");
});


