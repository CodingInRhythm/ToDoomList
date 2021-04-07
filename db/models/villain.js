'use strict';
module.exports = (sequelize, DataTypes) => {
  const Villain = sequelize.define('Villain', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING
  }, {});
  Villain.associate = function(models) {
    // associations can be defined here
    Villain.hasMany(models.Scheme, {
      foreignKey: "villainId",
      onDelete: "cascade",
      hooks: true,
    });
  };
  return Villain;
};