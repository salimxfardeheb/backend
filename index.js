const express = require("express");
const { getuser, getProduct, adduser,client } = require("./db");
const { showdata } = require('./functions')
const Produit = require('./models/product');

const app = express();
const port = 3000;

app.use(express.json);
app.get("/", (req, res) => {
  res.send("hello this is home page");
});

  const user_test = { name: "salim", password: "salim123" };
  

  // authentification
  app.get("/get-user", async (req, res) => {
    const name = user_test.name;
    const pwd = user_test.password;
    const user_result = await getuser(name,pwd);
    showdata(user_result, res)
  });
// authentification
app.get("/get-user", async (req, res) => {
  const user_result = await getuser(user_test.username, user_test.password);
  showdata(user_result, res)
});

app.get("/get-products", async (req, res) => {
  const product_result = await getProduct();
  console.log(product_result)
  showdata(product_result, res);
});

  app.post('/user',async(req,res)=>{
    try
    {
      const result = await adduser("salim","salim@gmail.com","salim123");
      res.status(201).send({ message: 'Utilisateur ajouté avec succès', user: result });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erreur lors de l\'ajout de l\'utilisateur' });
      }
    })

app.post('/commande',async(req,res)=>{
  try {
    await client.connect();
    


  } catch (error) {
    
  }
})

app.post('/produit', async (req, res) => {
  try {
    // Créer un nouvel utilisateur avec les données de la requête
    await client.connect();
    const newproduct = new Produit({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      quantity: req.body.category
    });
    // Insérer l'utilisateur dans la collection MongoDB
    const result = await newproduct.save();
    res.status(201).json({ message: 'produit ajouté avec succès', user: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'utilisateur' });
  }
  res.send('created')
})

app.post('/user', async (req, res) => {
  try {
    console.log("wait1..");
    const result = await adduser(req.body.username, req.body.email, req.body.password);
    console.log("wait..");
    res.status(201).json({ message: 'Utilisateur ajouté avec succès', user: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'utilisateur' });
  }
  res.send('created')
});

  app.listen(port, () => {
    console.log(`server is running on port ${port}...`);
  });
