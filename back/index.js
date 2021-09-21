const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const wilderController = require("./controllers/wildersController.js");
const app = express();
port = process.env.port || 8000;

mongoose
    .connect("mongodb+srv://lolarne:rnelola@cluster0.6iewv.mongodb.net/WCS?retryWrites=true&w=majority", {
        autoIndex: true,
    })
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

function runAsyncWrapper(callback) {
    return function (req, res, next) {
        callback(req, res, next).catch(next);
    };
};

app.post("/api/wilder/create", runAsyncWrapper(wilderController.create));
app.get("/api/wilder/get", runAsyncWrapper(wilderController.get));
app.put("/api/wilder/update/:id", runAsyncWrapper(wilderController.update));
app.delete("/api/wilder/delete/:id", runAsyncWrapper(wilderController.delete));

app.use((error, req, res, next) => {
    res.status(error.status);
    res.json({
        status: error.status,
        message: error.message,
        stack: error.stack
    });
});

app.listen(port, () => console.log(`Server started on ${port}`));