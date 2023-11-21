require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");
const path =require("path");
const app = express();
const scripturesRoute = require('./routes/scriptures');
const notesRoute = require('./routes/notes');
  
app.use(cors());

mongoose.set('strictQuery', false);

app.use(express.static(path.join(__dirname,'build')));
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => console.log("Successfully Connected to Database"));

app.use('/notes', notesRoute);
app.use('/scriptures', scripturesRoute);

if (process.env.NODE_ENV === 'production') {           
  app.use(express.static('front-end/build'));

  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
   });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`App listening at http://localhost:${PORT}`);
});
