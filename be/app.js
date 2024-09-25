const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./userModel");

const app = express();
const port=8000;
app.use(express.json());

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://admin:admin123@cluster0.yqr7kct.mongodb.net/mydatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(error => console.log("MongoDB connection error:", error));


// const User1=mongoose.model("userSignUp");
// Routes
app.get("/", (req, res) => {
  res.send({ status: "started" });
});

app.post("/register", async (req, res) => {

    const { mailId, password, confirmPassword, stdPhNo, parentPhNo, batch } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ mailId:mailId });
    if (existingUser) {
      return res.send({ status: "error", message: "User already exists" });
    }
    else{
   try{
    // Create a new user
      const User1=await User({
        mailId:mailId,
        password:password,
        confirmPassword,
        stdPhNo,
        parentPhNo,
        batch
      });
      await User1.save();
      res.json(User1);

    res.send({ status: "success", message: "User created successfully" });}
   catch (error) {
    console.error("Registration failed:", error);
    res.status(500).send({ status: "error", message: "Server error" });
  }
}
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});