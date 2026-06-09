const express = require("express");
const app = express();
const mysql = require('mysql2');
const cors = require("cors");
const db = require('./database');

app.use(cors({
  origin: "http://localhost:3000"
}));
    
app.use(express.json());

// Requisições para adição de pets para adoção

app.get("/pet_adocao", (req, res) => {
  const SQL = "SELECT * FROM pet_adocao";
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

// Requisições para a adoção de pets

app.get("/adocao", (req,res)=>{
  const SQL = "SELECT * FROM adocao";

  db.query(SQL, (err,result)=>{
    if(err){
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar adoções"});
    } else{
      res.status(201).json({result});
    }
  });
});

app.post("/adocao", (req,res)=>{
  const {petID, nome, sobrenome, endereco, endereco2, cidade, estado, cep, motivo} = req.body;
  const SQL = "INSERT INTO adocao(id, nome, sobrenome, endereco, endereco_aux, cidade, estado, cep, motivo, petID) VALUES (null, ?,?,?,?,?,?,?,?,?)";

  db.query(SQL, [nome, sobrenome, endereco, endereco2, cidade, estado, cep, petID], (err, result)=>{
    if(err){
      console.log(err);
      res.status(500).json({ error: "Erro ao registrar adoção"});
    } 
    res.status(201).json({message: "Adoção registrada com sucesso"});
  });
});

app.put("/adocao/:id", (req, res)=>{
  const id = req.params.id;
  const {nome, sobrenome, endereco, endereco2, cidade, estado, cep} = req.body;
  const SQL = "UPDATE adocao SET nome = ?, sobrenome = ?, endereco = ?, endereco_aux = ?, cidade = ?, estado = ?, cep = ? WHERE id = ?";

  db.query(SQL, [nome, sobrenome, endereco, endereco2, cidade, estado, cep, id], (err, result)=>{
    if (err){
      console.log(err);
      res.status(500).json({error: "Erro ao editar adoção"});
    } else {
      res.status(201).json({message: "Adoção editada com sucesso"});
    }
  });
});

app.delete("/adocao/:id", (req, res)=>{
  const id = req.params.id;
  const SQL = "DELETE FROM adocao WHERE id = ?"

  db.query(SQL, [id], (err, result)=>{
    if (err){
      console.log(err);
      res.status(500).json({error: "Erro ao excluir adoção"});
    } else {
      res.status(201).json({message: "Adoção deletada com sucesso"});
    }
  })
});

app.listen(3001,()=>{
  console.log("rodando servidor");
});


