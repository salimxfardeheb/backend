  const express = require("express");
  const { getuser, getProduct,adduser } = require("./db");
  const {showdata} = require('./functions')

  const app = express();
  const port = 3000;

  app.get("/", (req, res) => {
    res.send("hello this is home page");
  });

  const user_test = { name: "salim", password: "salim123" };
  const user_add = {}

  // authentification
  app.get("/get-user", async (req, res) => {
    const name = user_test.name;
    const pwd = user_test.password;
    const user_result = await getuser(name,pwd);
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

});


  app.listen(port, () => {
    console.log(`server is running on port ${port}...`);
  });