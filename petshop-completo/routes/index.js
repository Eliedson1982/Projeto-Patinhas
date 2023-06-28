var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
const { json } = require('express/lib/response');
const fs = require('fs');
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
router.get('/principal', function(req, res, next) {
  res.render('principal', { title: 'Atendimento' });
});
router.get('/produtos', function(req, res, next) {
  res.render('produtos', { title: 'Atendimento' });
});

router.get('/cadastro', function(req, res, next) {
  res.render('cadastro', { title: 'Formulário' });
});

router.get('/atendimento', function(req, res, next) {
  res.render('atendimento', { title: 'Atendimento' });
});
router.get('/gatos', function(req, res, next) {
  res.render('gatos', { title: 'Atendimento' });
});

router.get('/cachorro', function(req, res, next) {
  res.render('cachorro', { title: 'Atendimento' });
});



router.get('/pets', async function(req, res, next) {
  var pet =  await Pet.findAll();

  res.render('pets', { title: 'Cadastro', petsJson: pet });});



  router.get('/pessoa', async function(req, res, next) {
    var pessoas =  await Pessoa.findAll();
    res.render('pessoa', { title: 'pessoas', pessoasJson: pessoas });
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




  router.get('/edit/:id', async function(req,res){
    var pessoa = await Pessoa.findByPk(req.params.id);
    if(pessoa == null) {
      res.render("fail_find");
      
    } else {
    res.render('cadastro2', {title: 'Editar Pessoa', pessoa: pessoa});
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


  
router.post('/alterar', async function(req, res, next){
  var pessoa = await Pessoa.findByPk(req.body.id);
  if(pessoa == null) {
    res.render("fail_find");
  } else {
    pessoa = {
      nome: req.body.nome,
      email: req.body.email,
      telefone: req.body.telefone,
      
};

await Pessoa.update(pessoa,{where:{id: req.body.id}});
res.redirect('/pessoa');
}

});

  router.get('/deletar/:id', async function(req,res){
    var pet = await Pet.findByPk(req.params.id);
    if(pet == null) {
      res.render("fail_find");
      
    } else {
      await pet.destroy({where:{id: req.params.id}});
      res.redirect('/pets')
  
    }
  });


  router.get('/delete/:id', async function(req,res){
    var pessoa = await Pessoa.findByPk(req.params.id);
    if(pessoa == null) {
      res.render("fail_find");
      
    } else {
      await Pessoa.destroy({where:{id: req.params.id}});
      res.redirect('/pessoa')
  
    }
  });

  
  router.post('/cadastro', async function(req, res, next) {
  
    var pessoa = {
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
      };
    
      const result =  await Pessoa.create(pessoa);
      if (result == null){
        res.render("create_fail");
      } else {
        res.redirect('/pessoa');
      }
    });


  router.post('/pets', async function(req, res, next) {
    var pet = {
      nome: req.body.nome,
      raca: req.body.raca,
      idade: req.body.idade
    };
    
    const result = await Pet.create(pet);
    if (result == null) {
      res.render("create_fail");
    } else {
      res.redirect('/pets');
    }
  });
  
  
module.exports = router;
