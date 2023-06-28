var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
const { json } = require('express/lib/response');
const fs = require('fs');
const fs2 = require('fs');
const Pet = require('../models/pets');
const Pessoa = require('../models/pessoa');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/cadastro', function(req, res, next) {
  res.render('cadastro', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/tela1', function(req, res, next) {
  res.render('tela1', { title: 'Express' });
});
router.get('/cadastropet', function(req, res, next) {
  res.render('cadastropet', { title: 'Express' });
});
router.get('/pets', function(req, res, next) {
  res.render('pets', { title: 'Express' });
});

router.get('/cadastropet', async function(req, res, next) {
  var pet =  await Pet.findAll();
  
    res.render('cadastropet', { title: 'Cadastro', petJson: pet });
  });

  router.get('/editar/:id', async function(req,res){
    var pet = await Pet.findByPk(req.params.id);
    if(pet == null) {
      res.render("fail_find");
      
    } else {
    res.render('cadastropet', {title: 'Editar Pet', pet: pet});
    }
  });

  router.post('/alteracao', async function(req, res, next){
    var pet = await Pet.findByPk(req.body.id);
    if(pet == null) {
      res.render("fail_find");
    } else {
      pet = {
        nome: req.body.nome,
        raca: req.body.raca,
        idade: req.body.idade      
  };
  
  await Pet.update(pet,{where:{id: req.body.id}});
  res.redirect('/cadastropet');
  }
  
  });

  router.get('/deletar/:id', async function(req,res){
    var pet = await Pet.findByPk(req.params.id);
    if(pet == null) {
      res.render("fail_find");
      
    } else {
      await pet.destroy({where:{id: req.params.id}});
      res.redirect('/cadastropet')
  
    }
  });

  router.post('/pets', async function(req, res, next) {
  
    var pet = {
        nome: req.body.nome,
        raca: req.body.raca,
        idade: req.body.idade,
      };
    
      const result =  await Pet.create(pet);
      if (result == null){
        res.render("create_fail");
      } else {
        res.redirect('/cadastropet');
      }
    });


    router.get('/pets', async function(req, res, next) {
        var pets = JSON.parse(fs.readFileSync("./database.json"));
      
        res.render('pets', { title: 'Pets', petsJson: pets });
      });


      router.get('/pessoa', async function(req, res, next) {
        var pessoas = JSON.parse(fs2.readFileSync("./databasepessoas.json"));
        res.render('pessoa', { title: 'Pessoas', pessoasJson: pessoas });
      });

      router.get('/editar/:id', async function(req,res){
        var pets = JSON.parse(fs.readFileSync("./database.json"));
        var pe = pets.find((x) => x.id == req.params.id);
        res.render('cadastropet2', {title: 'Editar Pet', pet: pe});
      });
      router.get('/edit/:id', async function(req,res){
        var pessoas = JSON.parse(fs2.readFileSync("./databasepessoas.json"));
        var pes = pessoas.find((x) => x.id == req.params.id);
        res.render('cadastro2', {title: 'Editar Pessoa', pessoa: pes});
      });
      

      router.post('/alteracao', function(req, res, next){
        var pets = JSON.parse(fs.readFileSync("./database.json"));
        const index = pets.findIndex((x) => x.id == req.body.id);
        pets[index] = {
          id: req.body.id,
          nome: req.body.nome,
          raca: req.body.email,
          idade: req.body.telefone,
      }
      var petsAlterado = JSON.stringify(pets, null, 4);
      fs.writeFileSync("./database.json", petsAlterado);
      res.redirect('/pets'); 
      });

      router.post('/alterar', function(req, res, next){
        var pessoas = JSON.parse(fs2.readFileSync("./databasepessoas.json"));
        const index = pessoas.findIndex((x) => x.id == req.body.id);
        pessoas[index] = {
          id: req.body.id,
          nome: req.body.nome,
          email: req.body.email,
          telefone: req.body.telefone,
          
      }

      var pessoasAlterado = JSON.stringify(pessoas, null, 4);
      fs2.writeFileSync("./databasepessoas.json", pessoasAlterado);
      res.redirect('/pessoa');
      
      
      });

      router.get('/deletar/:id', function(req,res){
        var pets = JSON.parse(fs.readFileSync("./database.json"));
        var ide = req.params.id;
        var toRemove = pets.findIndex((x) => x.id == ide);
        pets.splice(toRemove, 1);
        var toWrite = JSON.stringify(pets, null, 4);
        fs.writeFileSync("./database.json", toWrite);
        res.redirect('/pets');
      
      });
       
      router.get('/delete/:id', function(req,res){
        var pessoas = JSON.parse(fs2.readFileSync("./databasepessoas.json"));
        var ide = req.params.id;
        var toRemove = pessoas.findIndex((x) => x.id == ide);
        pessoas.splice(toRemove, 1);
        var toWrite = JSON.stringify(pessoas, null, 4);
        fs2.writeFileSync("./databasepessoas.json", toWrite);
        res.redirect('/pessoa');
      
      });

      router.post('/cadastro', function(req, res, next) {
        var pessoas = JSON.parse(fs2.readFileSync("./databasepessoas.json"));
      
      
      
        var newId;
      
        if(pessoas) {
          if(pessoas.length == 0) newId = 1;
          else newId = pessoas[pessoas.length -1].id + 1;
        }
      
        
        var pessoa = {
          id: newId,
          nome: req.body.nome,
          email: req.body.email,
          telefone: req.body.telefone,
        };
        pessoas.push(pessoa);
        var toFile = JSON.stringify(pessoas, null, 4);
        fs2.writeFileSync("./databasepessoas.json", toFile);
      
      
        
        res.redirect('/cadastro');
      });
      
      
      
router.post('/cadastropet', function(req, res, next) {
    var pets = JSON.parse(fs.readFileSync("./database.json"));
  
  
  
    var newId;
  
    if(pets) {
      if(pets.length == 0) newId = 1;
      else newId = pets[pets.length -1].id + 1;
    }
  
    
    var pet = {
      id: newId,
      nome: req.body.nome,
      raca: req.body.raca,
      idade: req.body.idade
    };
    pets.push(pet);
    var toFile = JSON.stringify(pets, null, 4);
    fs.writeFileSync("./database.json", toFile);
  
  
    
    res.redirect('/cadastropet');
  });
  
module.exports = router;
