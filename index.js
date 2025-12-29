const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {

    response.sendFile(__dirname+"/index.html")

});


app.get("/universos", (request, response) => {
    let dadosJson = path.resolve("dados.json");
    let dados = JSON.parse(fs.readFileSync(dadosJson, "utf-8"));
    
    response.json(dados.universos);
})

// Trás por ID
app.get("/universo/:id", (request, response) => {
    let id = request.params.id;
    let dadosJson = path.resolve("dados.json");
    let dados = JSON.parse(fs.readFileSync(dadosJson, "utf-8"));
    let universo = dados.universos[id];

    let saida = {
        id: universo.id,
        nome: universo.nome,
        resumo: universo.resumo,
        filmes: [],
    }

    universo.filmes.forEach(id_filme => {
        saida.filmes.push(dados.filmes[id_filme]);
    });
    response.json(saida);
})

// Trás por ordem cronológica
app.get("/universo/c/:id", (request, response) => {
    let id = request.params.id;
    let dadosJson = path.resolve("dados.json");
    let dados = JSON.parse(fs.readFileSync(dadosJson, "utf-8"));
    let universo = dados.universos[id];

    let saida = {
        id: universo.id,
        nome: universo.nome,
        resumo: universo.resumo,
        filmes: [],
    }

    universo.ordem_cronologica.forEach(id_filme => {
        saida.filmes.push(dados.filmes[id_filme]);
    });
    response.json(saida);
})

// Trás por ordem de lançamento
app.get("/universo/l/:id", (request, response) => {
    let id = request.params.id;
    let dadosJson = path.resolve("dados.json");
    let dados = JSON.parse(fs.readFileSync(dadosJson, "utf-8"));
    let universo = dados.universos[id];

    let saida = {
        id: universo.id,
        nome: universo.nome,
        resumo: universo.resumo,
        filmes: [],
    }

    universo.ordem_lancamento.forEach(id_filme => {
        saida.filmes.push(dados.filmes[id_filme]);
    });
    response.json(saida);
})

app.listen(3000, () => {
    console.log("Servidor online!!");
})