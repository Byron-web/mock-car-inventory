const express = require("express");
const mongoose = require("mongoose");
const carRoutes = require("./routes/car.routes");
const PORT = 5000;
const cors = require("cors");

// Create a new instance of the Express application
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/cars", carRoutes);

// Serve the files in the public directory as static files
app.use(express.static("public"));

// Service health check
app.get("/hc", (req, res) => {
  res.send("healthy");
});

// MongoDB configuration
mongoose
  .connect("mongodb://localhost:27017/carInventory")
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
