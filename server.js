const express = require('express');

const app = express();

app.use(express.static('./dist/covidBoard'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/covidBoard/'}),
);

app.listen(process.env.PORT || 8080);
