const express = require("express");
const mongoose = require("mongoose");
const urlRoutes = require('./routes/urlRoutes')

const db = mongoose.connection;
const app = express();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MongoDB_URL);


db.on('error',()=> {
  console.log('error');
});
db.once('open',()=>{
  console.log('connected');
});

app.set('view engine','ejs');
app.use('/public', express.static("public"));
app.use('/', urlRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.listen(PORT, () => {
  console.log("SERVER IS RUNNING ");
});
