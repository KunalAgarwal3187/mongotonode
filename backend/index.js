import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./module/userModule.js";

const app = express();
dotenv.config();

app.use(express.json());

app.post("/user", async (req, res) => {
    const user = await User.create(req.body);
    console.log(user);
    res.send(user);
});

app.get("/", async (req, res) => {
    const user = await User.find();
    console.log(user);
    res.send(user);
});

app.get("/user/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    res.send(user);
});

app.put("/user/:id", async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.send("User updated successfully");
});

app.delete("/user/:id", async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send("User deleted successfully");
});

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
