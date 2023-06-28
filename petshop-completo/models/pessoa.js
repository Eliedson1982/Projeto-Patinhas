const {Sequelize, DataTypes} = require('sequelize');
const conexaopessoa = new Sequelize(
  'petAna',
  'root',
  'ifrs2022!',
  {
    host: '200.132.218.138',
    dialect: 'mysql',
    port: 3308
  }

);

conexaopessoa. authenticate().then(() =>{
  console.log("DEU BOM");
}).catch((error) => {
  console.log("DEU RUIM");
});

const Pessoa = conexaopessoa.define (
  "Pessoa",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },

  telefone: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

}
  
);

Pessoa.sync();

module.exports = Pessoa;