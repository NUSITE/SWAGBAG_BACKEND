

//Imports

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require('./routes/user-routes');
const productRoutes = require('./routes/product-routes');
const jwt = require("jsonwebtoken");
const cors = require('cors');

//App Set Up
const PORT = process.env.PORT || 3200;
const app = express();
app.use(cors());
app.use(express.json());


// Token Verification

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    // res.json({message: "Token Needed"});
    res.status(412).json({message: "Token Needed", isAuth: false});
  } else {
    jwt.verify(token, "bearer", (error, decoded) => {
      if (error) {
        res.status(412).json({message: "wrong token", isAuth: false});
      } else {
        next();
      }
    })
  }
}

// Routes Started

app.get("/", (req, res, next) => {
  res.json({message: "checking"});
});

app.get("/api/verifyToken", verifyToken, (req, res, next) => {
  res.json({isAuth: true});
})

app.use('/user', userRoutes);
app.use('/api/product', verifyToken, productRoutes);

app.get('/api/logout', verifyToken, (req, res, next) => {
  req.session.destroy();
})


// Mongoose Set Up
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose
  .connect('mongodb+srv://SivatejaN:Srm@9963956295@cluster0.m6kqz.mongodb.net/SWAGBAG?retryWrites=true&w=majority')
  .then(() => {
    app.listen(PORT, () => {
      console.log("Mongo connection passed");
    });
  })
  .catch((error) => {
    console.log("Mongo db Connection failed", error);
  });
