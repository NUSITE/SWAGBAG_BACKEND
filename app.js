

//Imports

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require('./routes/user-routes');

//App Set Up
const PORT = process.env.PORT || 3200;
const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
  res.json({"message": "checking"});
});

app.use('/api/user', userRoutes);


// Mongoose Set Up
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose
  .connect('mongodb+srv://SivatejaN:Srm@9963956295@cluster0.m6kqz.mongodb.net/SWAGBAG?retryWrites=true&w=majority')
  .then(() => {
    app.listen(PORT, () => {
      console.log("Thotakura kattamma is watching");
    });
  })
  .catch((error) => {
    console.log("Mongo db Connection failed", error);
  });
