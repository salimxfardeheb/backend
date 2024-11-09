  const express = require("express");
  const { getuser, getProduct,adduser } = require("./db");
  const {showdata} = require('./functions')

  const app = express();
  const port = 3000;

  app.get("/", (req, res) => {
    res.send("hello this is home page");
  });

  const user_test = { name: "salim", password: "salim123" };

  // authentification
  app.get("/get-user", async (req, res) => {
    const name = req.body.name;
    const pwd = req.body.pwd;
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
      const result=await adduser(req.body.username,req.body.email,req.body.password);
      res.status(201).json({ message: 'Utilisateur ajouté avec succès', user: result });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'utilisateur' });
      }

});


  app.listen(port, () => {
    console.log(`server is running on port ${port}...`);
  });