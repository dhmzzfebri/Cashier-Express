'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productss extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  productss.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantity: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'productss',
  });
  return productss;
};