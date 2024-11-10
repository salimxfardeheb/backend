const express = require("express");
const { getuser, getProduct, adduser, client, create_cart } = require("./db");
const { showdata } = require("./functions");
const Produit = require("./models/product");

const app = express();
const port = 3000;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello this is home page");
});

const user_test = { name: "salim", password: "salim123" };

// authentification
app.get("/get-user", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user_result = await getuser(username, password);
  showdata(user_result, res);
});

// recuperation des produits
app.get("/get-products", async (req, res) => {
  const product_result = await getProduct();
  showdata(product_result, res);
});

//panier
app.post("/client-cart", async (req, res) => {
  const id_client = req.body.id_client;
  const products = req.body.products;

  try {
    // Appel de la fonction create_cart avec les paramètres dans le bon ordre
    const createCart = await create_cart(id_client, products);
    if (createCart) {
      res.status(200).send({ message: "success", object: createCart });
    }
  } catch (error) {
    res.status(500).send({ error: "Erreur : " + error.message });
  }
});

app.post("/commande", async (req, res) => {
  try {
    await client.connect();
  } catch (error) {}
});

app.post("/produit", async (req, res) => {
  try {
    // Créer un nouvel utilisateur avec les données de la requête
    await client.connect();
    const newproduct = new Produit({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      quantity: req.body.category,
    });
    // Insérer l'utilisateur dans la collection MongoDB
    const result = await newproduct.save();
    res
      .status(201)
      .json({ message: "produit ajouté avec succès", user: result });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'ajout de l'utilisateur" });
  }
  res.send("created");
});

app.post("/user", async (req, res) => {
  try {
    console.log("wait1..");
    const result = await adduser(
      req.body.username,
      req.body.email,
      req.body.password
    );
    console.log("wait..");
    res
      .status(201)
      .json({ message: "Utilisateur ajouté avec succès", user: result });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'ajout de l'utilisateur" });
  }
  res.send("created");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}...`);
});
