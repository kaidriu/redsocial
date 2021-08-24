module.exports = (sequelize, Sequelize) => {
    const Publication = sequelize.define("publication", {

      title: { 
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
        
      }
      // userId: {
      //   allowNull: true,
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'users',
      //     key: 'id'
      //   }
      // }
    });
  
    return Publication;
  };

