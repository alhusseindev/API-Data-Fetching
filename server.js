const express = require("express");
const app = express();
const api = require("./api");



app.use("/api", api);

app.use(express.json());


app.listen(5000, () =>{
    console.log("App is listening on port 5000!");
});


module.exports = app;