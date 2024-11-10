const { MongoClient } = require("mongodb");
const user=require('./models/user');


// Connexion à MongoDB Atlas
const uri =
  "mongodb://localhost:27017/store";

const client = new MongoClient(uri);
const store = "store"; // database name
const users = "users"; // users collection name
const products = "products"; // products collection name

//get user function
async function getuser(username, password) {
  try {
    await client.connect();
    const dbb = client.db(store);
    const collection = dbb.collection(users);
    const fetch_users = await collection
      .find({ username: username, password: password })
      .toArray();
    return fetch_users;
  } catch (error) {
    console.log("Erreur :", error);
  } finally {
    await client.close();
  }
}

// get products functions
async function getProduct() {
  try {
    await client.connect();
    const dbb = client.db(store);
    const collection = dbb.collection(products);
    const fetch_products = await collection.find().toArray();
    return fetch_products;
  } catch (error) {
    console.log("Erreur :", error);
  } finally {
    await client.close();
  }
}



//post user
async function adduser(namein,emailin,passwordin) {
  try {
    await client.connect();
    const dbb = client.db(store);
    const collection = dbb.collection(users);
    const newUser = new User({
      username: namein,
      email: emailin,
      password:passwordin
    });
    const add_users = await collection.insertOne(newUser);
    return add_users;
  } catch (error) {
    console.log(error);    
  }
  finally {
    await client.close();
  }
}


module.exports = { getuser, getProduct,adduser,client};
