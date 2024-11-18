const express = require("express");
const { getuser, getProduct, adduser,addproduct,addPanier,updatecommand} = require("./db");
const { showdata } = require('./functions')
const Produit = require('./models/product');

const app = express();
const port = 3000;

app.use(express.json());
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
  const user_result = await getuser('mohammed',25);
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
      const result = await adduser(req.body.name,req.body.email,req.body.password);
      res.status(201).send({ message: 'Utilisateur ajouté avec succès', user: result });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erreur lors de l\'ajout de l\'utilisateur' });
      }
    })

    app.post('/produit', async (req, res) => {
      try {
        const result = await addproduct(req.body.name,req.body.category,req.body.img);
        res.status(201).json({ message: 'produit ajouté avec succès', user: result });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'ajout du produit ' });
      }
      res.send('created')
    })

   app.post('/panier',async(req,res)=>{
    try {
      const  result =await addPanier(req.body.iduser,req.body.idproduit);
      res.status(201).send({ message: 'produit ajouté au panier', user: result });
    } catch (error) {
      console.error(error);
        res.status(500).send({ message: 'Erreur lors de l\'ajout du produit' });
    }
   })
 app.put('/command/:id',async(req,res)=>
 {
  try {
    const result=await updatecommand(req.params,req.body);

    if(!result)
    {
      res.status(404).send({message:'command non trouve'});
    }
    else{
      res.status(201).send({message:'command mise a jour'});
    }    
  } catch (error) {
    console.error(error);
    res.status(500).send({message:'erreur lors de la mise a jour'})
  }
 }
  
)    
/*
let db, clientsCollection;

MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connexion à MongoDB réussie');
    db = client.db('store'); // Remplacez par le nom de votre base de données
    clientsCollection = db.collection('user');
  })
  .catch(error => console.error(error));


*/
app.post('/commande',async(req,res)=>{
  try {
    await client.connect();
    


  } catch (error) {
    
  }
})


/*app.post('/user', async (req, res) => {
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
*/
  app.listen(port, () => {
    console.log(`server is running on port ${port}...`);
  });
