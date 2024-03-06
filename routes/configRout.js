const indexR = require('./index');
const usersR = require('./users');

exports.appInit = (app) =>{
    app.use("/",indexR);
    app.use("/users",usersR);
}
