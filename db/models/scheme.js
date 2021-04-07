'use strict';
module.exports = (sequelize, DataTypes) => {
  const Scheme = sequelize.define('Scheme', {
    name: DataTypes.STRING,
    villainId: DataTypes.INTEGER
  }, {});
  Scheme.associate = function(models) {
    // associations can be defined here
    Scheme.belongsTo(models.Villain, {foreignKey: 'villainId'})
    Scheme.hasMany(models.Ploy, { foreignKey: 'schemeId', onDelete: 'cascade', hooks: true})
  };
  return Scheme;
};