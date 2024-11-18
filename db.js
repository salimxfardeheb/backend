const { MongoClient,ObjectId } = require("mongodb");
const user=require('./models/user');
// Connexion à MongoDB Atlas
const uri =
  "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);
const store = "store"; // database name
const users = "users"; // users collection name
const products = "products"; // products collection name
const panier="panier";



//get user function
async function getuser(username, password) {
  try {
    await client.connect();
    const dbb = client.db(store);
    const collection = dbb.collection(users);
    const fetch_users = await collection
      .find({ name: username, age: password })
      .toArray();
      console.log(fetch_users)
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
    const newUser = {
      username: namein,
      email: emailin,
      password:passwordin
    };
    const add_users = await collection.insertOne(newUser);
    return add_users;
  } catch (error) {
    console.log(error);    
  }
  finally {
    await client.close();
  }   
}

//post product

async function addproduct(name,category,img) { 
  try {
    await client.connect();
    const dbb = client.db(store);
    const collection = dbb.collection(products);
    const newProduct = {
      pname: name,
      pcategory: category,
      password:passwordin
    };
    const add_users = await collection.insertOne(newUser);
    return add_users;
  } catch (error) {
    console.log(error);    
  }
  finally {
    await client.close();
  }
}

async function addPanier(user,product) {
  try {
    await client.connect();
    const dbb = client.db(store);
    const collection = dbb.collection(panier);
    const newPanier = {
      iduser: user,
      idproduct: product,
      commande:0
    };
    const add_panier = await collection.insertOne(newPanier);
    return add_panier;
  } catch (error) {
    console.log(error);    
  }
  finally {
    await client.close();
  }
}

async function updatecommand(id,status) {
  try {
    await client.connect();
    const dbb = client.db(store);
    const collection = dbb.collection(panier);
    const updatedPanier = await collection.findByIdAndUpdate(id, { $set: status }, { new: true });
    return updatedPanier;
  } catch (error) {
    console.log(error);
  }
  finally {
    await client.close();
  }


}


module.exports = { getuser, getProduct,adduser,addproduct,addPanier,updatecommand};
