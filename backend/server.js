process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });  

require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");
const path =require("path");
const app = express();
const scripturesRoute = require('./routes/scriptures');

mongoose.set('strictQuery', false);

app.use(express.static(path.join(__dirname,'build')));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => console.log("Successfully Connected to Database"));

const noteSchema = new mongoose.Schema({
    title: { type: String },
    content: { type: String, required: true },
    address: { type: String, required: true },
    citation: { type: String }
}, {
  timestamps: true,
});

const note = mongoose.model("note",noteSchema);

app.get("/notes", function (req,res){
    const searchTerm = req.query.q;
    note.find((err,result) => {
        if(err){
            console.log(err);
        } else{
            res.json(result);
            
        }
    });
});

app.post("/add", function(req,res){

    const newNote = new note(req.body);
    newNote.save();

    console.log("New Note Added Successfully");
    
});

app.post("/delete", function(req,res){

    const id = req.body.idNote;
    note.findByIdAndDelete(id, (err) => {
        if(err){
            console.log(err);
        } else{
            console.log("Note Deleted Successfully");
            
        }
    });
});

app.use('/scriptures', scripturesRoute);

if (process.env.NODE_ENV === 'production') {           
  app.use(express.static('front-end/build'));

  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
   });
}

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, function() {
  console.log(`App listening at http://${HOST}:${PORT}`);
});
