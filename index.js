const express = require("express");
const { getuser, getProduct, adduser, client, create_cart } = require("./db");
const { showdata } = require("./functions");

const app = express();
const port = 3000;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello this is home page");
});

// sign in
app.post("/user", async (req, res) => {
  try {
    const result = await adduser(
      req.body.name,
      req.body.email,
      req.body.password
    );
    res
      .status(201)
      .send({ message: "Utilisateur ajouté avec succès", user: result });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Erreur lors de l'ajout de l'utilisateur" });
  }
});

// authentification
app.get("/get-user", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user_result = await getuser(username, password);
  showdata(user_result, res);
});

// creating products collection
app.post("/produit", async (req, res) => {
  try {
    const result = await addproduct(
      req.body.name,
      req.body.category,
      req.body.img
    );
    res
      .status(201)
      .json({ message: "produit ajouté avec succès", user: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'ajout du produit " });
  }
  res.send("created");
});

// getting all products
app.get("/get-products", async (req, res) => {
  const product_result = await getProduct();
  showdata(product_result, res);
});

// creating cart for client
app.post("/client-cart", async (req, res) => {
  const { id_client, products } = req.body;

  if (!id_client || !Array.isArray(products)) {
    return res.status(400).send({ error: "Undifined data." });
  }
  try {
    const newCart = await create_cart(id_client, products);
    res.status(200).send({ message: "success" });
  } catch (error) {
    console.error("Error creating cart :", error);
    res.status(500).send({ error: "Error creating cart." });
  }
});

// validate command by client
app.put("/command/:id", async (req, res) => {
  try {
    const result = await updatecommand(req.params, req.body);

    if (!result) {
      res.status(404).send({ message: "command non trouve" });
    } else {
      res.status(201).send({ message: "command mise a jour" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "erreur lors de la mise a jour" });
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}...`);
});
