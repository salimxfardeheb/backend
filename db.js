const { MongoClient } = require("mongodb");

const uri =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.3";

const client = new MongoClient(uri);
const store = "store"; // database name
const users = "users"; // users collection name
const products = "products"; // products collection name
const cart = "cart";

//get user function
async function getuser(username, password) {
  try {
    await client.connect();
    const dbb = client.db(store);
    const collection = dbb.collection(users);
    const fetch_users = await collection
      .find({ name: username, pasword: password })
      .toArray();
    console.log(fetch_users);
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

// create collection cart
async function create_cart(id_client, products) {
  try {
    await client.connect();
    console.log("Données reçues pour le panier :", cart);
    const dbb = client.db(store);
    const collection = dbb.collection(cart);

    // verification si le client a deja un panier :
    const client_cart = await collection.findOne({ id_client: id_client });
    if (client_cart) {
      console.log("client has aleready a cart :", client_cart);
      const update_cart = await collection.updateOne(
        { id_client: id_client },
        { $set: { products: products } }
      );
      console.log("successful update !", update_cart)
      return update_cart;
    } else {
      console.log("client does not have a cart, creating cart...");
      const newCart = await collection.insertOne({
        id_client: id_client,
        products: products,
      });
      console.log("cart saved :", newCart);
      return newCart;
    }
  } catch (error) {
    console.error("Error creating collection cart :", error);
    throw error;
  } finally {
    await client.close();
  }
}

//post user
async function adduser(namein, emailin, passwordin) {
  try {
    await client.connect();
    const dbb = client.db(store);
    const collection = dbb.collection(users);
    const newUser = new User({
      username: namein,
      email: emailin,
      password: passwordin,
    });
    const add_users = await collection.insertOne(newUser);
    return add_users;
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

module.exports = {
  getuser,
  getProduct,
  adduser,
  create_cart,
};
