const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const dbConfig = require('./src/config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connect DB
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB connected successfully');
}).catch((err) => {
    console.log(`Couldn't  connect to DB ${err}`);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({ "message": "This is my root url." });
});

// Require notes route
require('./src/routes/note.routes')(app);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
