// Core Module
const path = require('path');

// External Module
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const { default: mongoose } = require('mongoose');

const DB_PATH = yourMongoDBConnectionString; // Replace with your MongoDB connection string
// Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/pathUtil");
const errorsController = require("./Controllers/error");

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const store = MongoStore.create({
  mongoUrl: DB_PATH,
  collectionName: 'sessions'
});

app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "KnowledgeGate AI with Complete Coding",
  resave: false,
  saveUninitialized: true,
  store
}));

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});

app.use(authRouter);
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')));

app.use(errorsController.pageNotFound);

/* const PORT = 5001; */

mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});