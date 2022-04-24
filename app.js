// // ---------------- mongoose code below ---------------------
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fruitsDB');

const fruitSchema = new mongoose.Schema ({
  name: String,
  rating: Number,
  review: String
});

// creating model
const FruitModel = mongoose.model("Fruit", fruitSchema);

const fruit = new FruitModel ({
  name: "Apple",
  rating: 7,
  review: "Preety solid as a fruit."
});

const kiwi = new FruitModel({
  name: "Kiwi",
  rating: 3,
  review: "Best fruit"
});

const orange = new FruitModel({
  name: "Orange",
  rating: 8,
  review: "Best source of Vitamin C"
});

const banana = new FruitModel({
  name: "Banana",
  rating: 9,
  review: "Minions's fruit"
});

//for adding multiple data
FruitModel.insertMany([kiwi, orange, banana], function(err){
  if (err){
    console.log(err);
  }else{
    console.log("Successfully added 3 more fruits in fruitsDB");
  }
});

// Reading data from database. through app.js

FruitModel.find(function(err, fruits){
  if(err){
    console.log(err);
  }else{
    console.log(fruits);
  }
});


//adding single data through save
//fruit.save();

// new collection of people through mongoose

// const mongoose = require('mongoose');
//
// mongoose.connect('mongodb://localhost:27017/peopleDB');
//
// const peopleSchema = new mongoose.Schema ({
//   name: String,
//   age: Number,
// });
//
// // creating model
// const peopleModel = mongoose.model("People", peopleSchema);
//
// const people = new peopleModel ({
//   name: "Bimal Patel",
//   rating: 27
// });
//
// people.save();


// ------------------------ mongo db code below ----------------------
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//connection url
const url = 'mongodb://localhost:27017';

//db name
const dbName= 'fruitsDB';

//create a new MongoClient
const client = new MongoClient(url);

// use connect method to connect to server
client.connect(function(err){
  assert.equal(null,err);
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  insertDocument(db, function() {
    client.close();
  });
});

const insertDocument = function(db, callback){
  //get documents collection
  const collection = db.collection('fruits');

  //insert some documents
  collection.insertMany([
    {name:"Apple", score: 8, review: "Great fruit"},
    {name:"Orange", score: 6, review: "Kinda sour"},
    {name:"Banana", score: 9, review: "Great stuff!"}
  ], function(err, result) {
      assert.equal(err, null);
      console.log("Inserted 3 documents into the collection");
      callback(result);
  });
}
