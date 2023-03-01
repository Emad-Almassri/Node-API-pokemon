const path = require("path");
const express = require("express");
const app = express();
const axios = require("axios");

async function makeRequest(name) {
  const config = {
    method: "get",
    url: `https://pokeapi.co/api/v2/pokemon/${name}`,
  };

  const res = await axios(config);
  return res;
}
function Random(max) {
  return Math.floor(Math.random() * max);
}

async function save() {
  let x = Random(100);
  const pokemon1 = await makeRequest(x);
  x = Random(100);
  const pokemon2 = await makeRequest(x);
  x = Random(100);
  const pokemon3 = await makeRequest(x);
  const array = [pokemon1, pokemon2, pokemon3];
  return array;
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pages"));

app.get("/", async (req, res) => {
  const temp = await save();
  res.render("home", {
    title: "Home Page",
    pokemons: [
      {
        name: temp[0].data.name,
        order: temp[0].data.order,
      },
      {
        name: temp[1].data.name,
        order: temp[1].data.order,
      },
      {
        name: temp[2].data.name,
        order: temp[2].data.order,
      },
    ],
  });
});
app.listen(3000, () => {
  console.log("Server started on port 3000");
  console.log("http://localhost:3000");
});
