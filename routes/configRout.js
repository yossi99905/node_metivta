const indexR = require('./index');
const usersR = require('./users');
const product = require('./products');

exports.appInit = (app) => {
    app.use("/", indexR);
    app.use("/users", usersR);
    app.use("/products", product);
}
