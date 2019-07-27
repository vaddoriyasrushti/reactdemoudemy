const Sequelize = require('sequelize');

const sequelize = new Sequelize('udemy1', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.sync({
  force: false
}).then(() => {
  console.log(`udemy db and table have been created`);
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Mysql connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const cartModel = require('./schemas/cart.schema');
const cart = cartModel(sequelize, Sequelize);
const categoriesModel = require('./schemas/categories.schema');
const categories = categoriesModel(sequelize, Sequelize);
const subcategoriesModel = require('./schemas/subcategories.schema');
const subcategories = subcategoriesModel(sequelize, Sequelize);
const signupModel = require('./schemas/signup.schema');
const signups = signupModel(sequelize, Sequelize);
const subcatsnameModel = require('./schemas/subcatsname.schema');
const subcatsname = subcatsnameModel(sequelize, Sequelize);

module.exports = {
  cart,
  categories,
  subcategories,
  signups,
  subcatsname
};