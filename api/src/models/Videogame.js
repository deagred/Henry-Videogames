const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description_raw: {
      type: DataTypes.STRING,
      allowNull: false
    },
    released: {
      type: DataTypes.DATE
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0.00
    },
    background_image: {
      type: DataTypes.STRING,
      defaultValue: 'https://i.imgur.com/c6o0KhX.png'
    },
    ratings_count: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    reviews_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    esrb_rating: {
      type: DataTypes.STRING,
      defaultValue: "Everyone 10+"
    }
  });
  

  sequelize.define('Genre', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });


  sequelize.define('Platform', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },    
  });


  // sequelize.define('Tag', {
  //   id: {
  //     type: DataTypes.INTEGER,
  //     primaryKey: true
  //   },
  //   name: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //   },        
  // })


};