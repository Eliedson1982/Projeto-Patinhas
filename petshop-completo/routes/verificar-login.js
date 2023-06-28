const express = require('express');
const router = express.Router();
const Pessoa = require('../models/pessoa');
// Rota POST /verificar-login
router.post('/', async (req, res) => {
  const { email, telefone } = req.body;

  try {
    // Consulta no banco de dados para verificar as informações de login
    const pessoa = await Pessoa.findOne({ where: { email, telefone } });

    if (pessoa) {
      // Credenciais válidas
      res.json({ autenticado: true });
    } else {
      // Credenciais inválidas
      res.json({ autenticado: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro ao verificar as informações de login.' });
  }
});

module.exports = router;
