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
    const user_result = await getuser(user_test.username, user_test.password);
    showdata(user_result, res)
  });

  app.get("/get-products", async (req, res) => {
    const product_result = await getProduct();
    console.log(product_result)
    showdata(product_result, res);
  });

  app.post('/user',async(req,res)=>{
    const result=await adduser("mohammed","mohammedderni@gmail.com","pass147258396","client",0);
    console.log(result);
});


  app.listen(port, () => {
    console.log(`server is running on port ${port}...`);
  });
