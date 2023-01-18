const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "favorites",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
    },
    { timestamps: true, createdAt: false }
  );
};
