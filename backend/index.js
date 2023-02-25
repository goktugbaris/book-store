let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let cors = require("cors");
const dotenv = require("dotenv");
let apiRouter = require("./api-router");
dotenv.config();
let port = process.env.port;
let dbcon = process.env.cloud_mongodb_con;

let app = new express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use("/api",apiRouter);

mongoose.set("strictQuery", false);
mongoose.connect(dbcon,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

var con = mongoose.connection;
if(!con) console.log("Could not connect to MongoDB")
else
{
    console.log("Successfully connected to MongoDB.")
}

app.get("/",(req,res)=>{
    res.send("Hello World")
});

app.listen(port,()=>{
    console.log("Node.js server is running.")
})