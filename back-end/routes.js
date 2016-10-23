module.exports = {
    '/exam': require('./controllers/examController'),
    '/crud': require('./controllers/crudController'),
    '/test': require('./controllers/testController'),
    '/getById': require('./controllers/crud/getById'),
    '/deleteById': require('./controllers/crud/deleteById'),
    '/deleteMany': require('./controllers/crud/deleteMany'),
    '/getMany': require('./controllers/crud/getMany'),
    '/insert': require('./controllers/crud/insert'),
    '/update': require('./controllers/crud/update'),
    '/connect': require('./controllers/connection/connect'),
    '/getConnection': require('./controllers/connection/getConnection')/*,
    './upload': require('./controllers/upload')*/
};