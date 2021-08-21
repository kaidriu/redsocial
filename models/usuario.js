module.exports = (sequelize, Sequelize) => {
    const Publicacion = sequelize.define("publicacion", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Publicacion;
  };