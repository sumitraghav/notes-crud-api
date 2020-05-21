const noteController = require('../controller/note.controller');

const routes = (app) => {
    app.post('/notes', noteController.create);

    app.get('/notes', noteController.findAll);

    app.get('/notes/:noteId', noteController.findOne);

    app.put('/notes/:noteId', noteController.update);

    app.delete('/notes/:noteId', noteController.delete);
};

module.exports = routes;