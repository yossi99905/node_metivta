const indexR = require('./index');
const usersR = require('./users');
const productR = require('./products');
const categoriesR = require('./categories');
const teacersR = require('./teachers');
const paymentR = require('./payment');

exports.appInit = (app) => {
    app.use("/", indexR);
    app.use("/users", usersR);
    app.use("/products", productR);
    app.use("/categories", categoriesR);
    app.use("/teachers", teacersR);
    app.use("/payment", paymentR);
}
