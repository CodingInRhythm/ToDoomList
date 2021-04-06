'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ploy = sequelize.define('Ploy', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    completed: DataTypes.BOOLEAN,
    dueAt: DataTypes.DATE,
    schemeId: DataTypes.INTEGER
  }, {});
  Ploy.associate = function(models) {
    // associations can be defined here
    Ploy.belongsTo(models.Scheme({foreignKey: 'schemeId'}))
  };
  return Ploy;
};