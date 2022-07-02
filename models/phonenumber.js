'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhoneNumber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PhoneNumber.belongsTo(models.User,{
        as: 'user',
        foreignKey : 'userId',
        onDelete : 'cascade',
        onUpdate : 'cascade',
        hooks : true
      });
    }
  }
  PhoneNumber.init({
    phone: {
      type : DataTypes.STRING(11),
      allowNull : false,
      unique : true,
      validate : {
        is: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
      }
    },
    userId : {
      type: DataTypes.INTEGER,
      allowNull:false,
      onDelete : 'cascade',
      onUpdate : 'cascade',
      references: {
        model : 'User',
        key: 'id'
      }
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'PhoneNumber',
    paranoid : true
  });

  /*sequelize.sync({ force: true});*/
  return PhoneNumber;
};