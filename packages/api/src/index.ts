import express from "express";
const app = express();
 
app.get("/", function (req, res) {
  res.send("Well... Seems to be working!");
});
 
app.listen(3000);