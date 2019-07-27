// load the things we need

module.exports = (sequelize, type) => {
    return sequelize.define('cart', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
     userid:{
         type:type.INTEGER,
         allowNull:false
     },
     catid:{
         type:type.INTEGER,
         allowNull: false
     }
    });
  };
  
  