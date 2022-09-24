const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const {
  createPollGetController,
  createPollPostController,
  getAllPolls,
  viewPollGetController,
  viewPollPostController
} = require("./PollController");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 4545;

app.set("view engine", "ejs");

// middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/',(req,res)=> {
  res.json({message: "this our root file"})
})
// app.get("/", (req, res) => {
//   res.render("home");
// });
app.post("/create", createPollPostController);
app.get("/create", createPollGetController);
app.get("/polls", getAllPolls);
app.get("/polls/:id", viewPollGetController);

app.post("/polls/:id", viewPollPostController);
app.all("*", (_, res) => {
  res.json({
    message: "Not Found",
  });
});
const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fp7ypgo.mongodb.net/express-cc`;
mongoose
  .connect(dbUrl)
  .then(() => {
    app.listen(port, () => {
      console.log("Application is ready to serve on port 4545");
    });
  })
  .catch((e) => {
    console.log(e);
  });