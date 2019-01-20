const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const _ = require("lodash");

var {mongoose} = require("./db/mongoose");
var  {Hawala} = require("./model/hawalas");

const app = express();
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var port = process.env.PORT || 3000;
app.engine(".hbs", exphbs({
    extname: ".hbs",
    defaultLayout: "main"
}));
app.set("view engine", ".hbs");
app.listen(port, () => {
    console.log("server is runing on port ", port);
});


app.get("/", (req, res) => {
    Hawala.find({}).then((doc) => {
        res.render("all", {
            all: doc.reverse()
        });
    });
});

app.get("/all", (req, res) => {
    Hawala.find({}).then((doc) => {
        res.render("all", {
            all: doc.reverse()
        });
    });
});

app.get("/payed", (req, res) => {
    Hawala.find({payed: "ተኸፊሉ"}).then((doc) => {
        res.render("payed", {
            payed: doc.reverse()
        })
    });
});
app.get("/unpayed", (req, res) => {
   Hawala.find({payed: "ኣይተኸፈለን"}).then((doc) => {
        res.render("unpayed", {
            unpayed: doc.reverse()
        });
   });
});
app.get("/add", (req, res) => {
    res.render("add");
});


app.post("/hawala", (req, res) => { 
   var hawala = new Hawala(req.body)
   hawala.save().then((todo) => {
       res.render("added", {
           todo
       });
   }, (e) => {
       res.render("notadded", {e})
   });
});

app.get("/id/:id", (req, res) => {
    var id  = req.params.id;
    Hawala.findById(id).then((doc) => {
        res.render("single", {doc});
    });
});

app.get("/payed/:id", (req, res) => {
    var id = req.params.id;

    Hawala.findOneAndUpdate({_id: id}, {$set: {payed: "ተኸፊሉ"}}, {new: true}).then((doc) => {
        res.render("single", {doc});
    });
});

app.get("/unpayed/:id", (req, res) => {
    var id = req.params.id;

    Hawala.findOneAndUpdate({_id: id}, {$set: {payed: "ኣይተኸፈለን"}}, {new: true}).then((doc) => {
        res.render("single", {doc});
    });
});

app.get("/delete/:id", (req, res) => {
    var id = req.params.id;
    Hawala.findOneAndDelete({_id: id}).then((doc) => {
        res.render("single")
    });
});