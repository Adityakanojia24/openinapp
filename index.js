const express = require("express");
const app = express();
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
//console.log(process.env.URL);
require('./db/coneection'); // connectiong detabse

app.use(require('./route/task'));

const port = process.env.PORT || 8000;
   
app.listen(port, () => { console.log("server is connected at 8000") });
