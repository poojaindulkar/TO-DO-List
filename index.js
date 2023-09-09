import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Database connnection
const mongo_URL=process.env.URL;
mongoose.connect(mongo_URL);

//new Schema
const itemSchema = new mongoose.Schema({
  task: String,
});
const Item = mongoose.model("item", itemSchema);
const WorkList = mongoose.model("workList", itemSchema);


app.get("/:route", (req, res) => {
  const route = req.params.route;
  if (route === "home") {
    Item.find({})
      .then(function (todayItems) {
        res.render("today.ejs", {
          List: todayItems,
        });
      })
  } else {
    WorkList.find({})
      .then(function (WorkItems) {
        res.render("work.ejs", {
          List: WorkItems,
        });
      })
  }
});

app.post("/:route", (req, res) => {
  const route = req.params.route;
  const newItem = req.body["ListItem"];
  if (route === "home") {
    Item.create({ task: newItem });
    res.redirect("/home");
  } else {
    WorkList.create({ task: newItem });
    res.redirect("/work");
  }
});

app.post("/delete/:route", (req, res) => {
  const route = req.params.route;
  const checkItemId = req.body.checkbox;

  if (route === "home") {
    Item.findByIdAndRemove(checkItemId)
      .catch(function (err) {
        console.log(err);
      });
    res.redirect("/home");
  } else {
    WorkList.findByIdAndRemove(checkItemId)
      .then(function () {
        console.log("Succsessfully removed item");
      })
      .catch(function (err) {
        console.log(err);
      });
    res.redirect("/work");
  }
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
