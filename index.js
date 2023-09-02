import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let toDoListToday = [];
let toDoListWork = [];


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("Today.ejs", {
        List: toDoListToday,
        
    });
});

app.get("/work", (req, res) => {
    res.render("work.ejs", {
        List: toDoListWork,
        
    });
});

app.post("/", (req, res) => {
    const newItem = req.body["ListItem"];
    toDoListToday.push(newItem);
    res.redirect("/");
});

app.post("/work", (req, res) => {
    const newItem = req.body["ListItem"];
    toDoListWork.push(newItem);

    res.redirect("/work");
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
