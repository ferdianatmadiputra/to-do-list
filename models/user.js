'use strict';
const {
  Model
} = require('sequelize');
let { hashPassword }= require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Project, { through: 'UserProjects' });
      User.hasMany(models.Task)

    }

    get initial(){
      return username[0];
    }
  };
  User.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (data, options) => {
        console.log('masuk hooks');
        data.password = hashPassword(data.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};