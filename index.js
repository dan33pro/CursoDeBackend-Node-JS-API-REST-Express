const express = require('express');
const routerApi = require('./routes');

const { logErrors, errorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Este es mi server en Express</h1>');
});

app.get('/new-route', (req, res) => {
  res.send('<h1>Esta es mi nueva ruta</h1>');
});

routerApi(app);

app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Corrinedo en: http://localhost:' + port);
});
