const express = require("express");
const { getuser } = require("./db");

const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send("hello this is home page");
});

const user_test = { username: "salim", password: "salim123" };

// authentification
app.get("/get-user", async (req, res) => {
  const user_result = await getuser(user_test.username, user_test.password);
  if (user_result && user_result.length > 0) {
    res.send(user_result);
  } else if (user_result && user_result.length === 0) {
    res.status(404).json({ message: "Aucun utilisateur trouvé." });
  } else {
    res.status(500).json({ error: "error geting users" });
  }
});

app.listen(port, () => {
  console.log("server is running...");
});
