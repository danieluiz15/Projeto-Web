const express = require("express");
const app = express();
const mysql = require('mysql2');
const cors = require("cors");
const db = require('./database');

app.use(cors({
  origin: "http://localhost:3000"
}));
    
app.use(express.json());


app.get("/pet_adocao", (req, res) => {
  let SQL = "SELECT * FROM pet_adocao";
  db.query(SQL, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao listar pets" });
    } else {
      res.status(201).json(result);
    }
  });
});

app.delete("/pet_adocao/:id", (req, res) => {
  const petId = req.params.id;
  const SQL = "DELETE FROM pet_adocao WHERE id = ?";

  db.query(SQL, [petId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao excluir pet" });
    } else {
      res.status(201).json({ message: "Pet excluído com sucesso"});
    }
  });
});

app.post("/pet_adocao",(req, res)=>{
  const {nome} = req.body;
  const {idade} = req.body;
  const {tipo} = req.body;
  const {descricao} = req.body;
  let SQL = "INSERT INTO pet_adocao(id,nome,tipo,idade,descricao) VALUES (null,?,?,?,?)";
  
  db.query(SQL,[nome,tipo, idade, descricao],(err, result)=>{
    if (err) console.log(err);
    res.status(201).json({ message: "Pet adicionado com sucesso"});
  })
});

app.put("/pet_adocao/:id", (req, res) => {
  const petId = req.params.id;
  const { nome, tipo, idade, descricao } = req.body;
  const SQL = "UPDATE pet_adocao SET nome = ?, tipo = ?, idade = ?, descricao = ? WHERE id = ?";
  db.query(SQL, [nome, tipo, idade, descricao, petId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao editar pet" });
    } else {
      res.status(201).json({ message: "Pet editado com sucesso"});
    }
  });
});  

app.listen(3001,()=>{
  console.log("rodando servidor");
});


