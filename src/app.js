const express = require('express');
const app = express();
const routes = require('./server/routes');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));
app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`operating on port ${port}`);
})
