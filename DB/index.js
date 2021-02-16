const express =  require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const xmlParser = require("xml2js").parseString;
const PORT = process.env.PORT || 5000;
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use(express.static("public"));
app.get("/", (req,res) => {
    res.render("index")

})
app.post("/", (req,res) =>{
    let trial = JSON.stringify(req.body);
    //const jsonData = JSON.parse(trial);
    res.send("This is the post route");
    console.log(`this is the received data ${trial}`);
    
    
})
app.get("/prename", async (req,res) => {
    res.send("This is the real shit to deal with");
    console.log("Request successfull!")
})
const CONNECTION_URL = "mongodb+srv://samiurkhan:arpeggio112@cluster0.uqt26.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true}
    ).then(() => app.listen(PORT, () => console.log(`Server running at ${PORT}`)))
    .catch((error) => console.log(error.message));
mongoose.set("useFindAndModify", false);
