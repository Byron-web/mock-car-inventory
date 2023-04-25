// Import the Express framework
const express = require("express");
const mongoose = require("mongoose");
const PORT = 5000;

// import routes
const authRoute = require("./routes/auth");

// Create a new instance of the Express application
const app = express();

app.use(express.json());
app.use(express.urlencoded());

// Serve the files in the public directory as static files
app.use(express.static("public"));

app.get("/api", (req, res) => {
  res.send("Server is working!");
});

app.use("/api/auth", authRoute);

mongoose
  .connect(
    "mongodb+srv://Byron_Labuschagne:UGSezTOWcp96YLwp@test.f6dzjwi.mongodb.net/myFirstDatabase"
  )
  .then(() => {
    console.log("connected to database");

    // Start the server and listen on port 5000
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
