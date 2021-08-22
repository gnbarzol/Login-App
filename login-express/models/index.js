const {sequelize, Sequelize } = require('../lib/mysql');

// Models
const BlogModel = require('./blog');
const UserModel = require('./user.model');

// Instancias
const Blog = BlogModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

// Descomentar si deseas actualizar los modelos de la base y luego volver a comentarlo.
// sequelize.sync({alter: true }).then(() => {
//   console.log('All models were synchronized successfully');
// });

// Cuando quieras recrear todo en la base
// sequelize.sync({force: true }).then(() => {
//   console.log('All models were synchronized successfully');
// });


User.hasMany(Blog, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
  onDelete: 'NO ACTION',
});
Blog.belongsTo(User, {
  as: 'user',
  foreignKey: {
    name: 'user_id',
  },
});

module.exports = {
  Blog,
  User
}