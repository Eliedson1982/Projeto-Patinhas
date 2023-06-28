const {Sequelize, DataTypes} = require('sequelize');
const conexao = new Sequelize(
  'petAna',
  'root',
  'ifrs2022!',
  {
    host: '200.132.218.138',
    dialect: 'mysql',
    port: 3308
  }

);

conexao. authenticate().then(() =>{
  console.log("DEU BOM");
}).catch((error) => {
  console.log("DEU RUIM");
});

const Pet = conexao.define (
  "Pet",
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
  raca: {
    type: DataTypes.STRING,
    allowNull: false
  },

  idade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

}
  
);

Pet.sync();

module.exports = Pet;