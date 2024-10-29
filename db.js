const { MongoClient } = require("mongodb");

// Connexion à MongoDB Atlas
const uri =
  "mongodb+srv://salim:salim123@store.y81bt.mongodb.net/store?retryWrites=true&w=majority&appName=store";

const client = new MongoClient(uri);
const store = "store"; // Nom de la base de données
const users = "users"; // Nom de la collection

async function getuser(username, password) {
  try {
    await client.connect();
    const dbb = client.db(store);
    const collection = dbb.collection(users);

    // Transformation du curseur en tableau
    const fetch_users = await collection.find({username: username, password: password}).toArray();

    return fetch_users;
  } catch (error) {
    console.log("Erreur :", error);
  } finally {
    // Fermeture de la connexion après la requête
    await client.close();
  }
}

module.exports = { getuser };
