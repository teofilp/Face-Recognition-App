const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
app.get('/', (req, res) => {
  res.send(path.join(__dirname + '/index.html'));
});
const port = process.env.PORT || 80;
app.listen(port);
