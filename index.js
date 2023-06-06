const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.com.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido en este origen'));
    }
  }
};
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('<h1>Este es mi server en Express</h1>');
});

app.get('/new-route', (req, res) => {
  res.send('<h1>Esta es mi nueva ruta</h1>');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Corrinedo en: http://localhost:' + port);
});
