const indexR = require('./index');
const usersR = require('./users');
const product = require('./products');
const categoriesR = require('./categories');
const teacersR = require('./teachers');

exports.appInit = (app) => {
    app.use("/", indexR);
    app.use("/users", usersR);
    app.use("/products", product);
    app.use("/categories", categoriesR);
    app.use("/teachers", teacersR);
}
