module.exports = {
    '/crud/getById': require('./controllers/crud/getById'),
    '/crud/deleteById': require('./controllers/crud/deleteById'),
    '/crud/deleteMany': require('./controllers/crud/deleteMany'),
    '/crud/getMany': require('./controllers/crud/getMany'),
    '/crud/insert': require('./controllers/crud/insert'),
    '/crud/update': require('./controllers/crud/update'),
    '/connect': require('./controllers/connection/connect'),
    '/getConnection': require('./controllers/connection/getConnection'),
    '/createAccount': require('./controllers/auth/createAccount'),
    '/authenticate': require('./controllers/auth/authenticate'),
    '/upload': require('./controllers/upload'),
    '/validateToken': require("./controllers/auth/validateToken"),
    '/changePassword': require("./controllers/auth/changePassword")
};
