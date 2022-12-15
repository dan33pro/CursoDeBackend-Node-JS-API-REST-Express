const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Este es mi server en Express</h1>');
});

app.get('/new-route', (req, res) => {
  res.send('<h1>Esta es mi nueva ruta</h1>');
});

// Quemando productos
let products = [
  {
    id: 1,
    name: 'Tablet',
    price: 200,
    categoryID: 1,
  },
  {
    id: 2,
    name: 'TV',
    price: 400,
    categoryID: 1,
  },
  {
    id: 3,
    name: 'Cama',
    price: 100,
    categoryID: 3,
  },
];

// Quemando categorias
let categories = [
  {
    id: 1,
    name: 'Tecnología',
  },
  {
    id: 2,
    name: 'Exteriores',
  },
  {
    id: 3,
    name: 'Muebles',
  },
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.filter((product) => product.id == id);
  res.json(product);
});

app.get('/categories', (req, res) => {
  res.json(categories);
});

app.get('/categories/:id', (req, res) => {
  const { id } = req.params;
  const category = categories.filter((category) => category.id == id);
  res.json(category);
});

app.get('/categories/:id/products', (req, res) => {
  const categoryID = req.params.id;
  const productsRes = products.filter(
    (product) => product.categoryID == categoryID
  );
  res.json(productsRes);
});

app.get('/categories/:categoryId/products/:productName', (req, res) => {
  const { categoryId, productName } = req.params;
  const productsRes = products.filter(
    (product) => product.categoryID == categoryId && product.name == productName
  );
  res.json(productsRes);
});

app.listen(port, () => {
  console.log('Corrinedo en: http://localhost:' + port);
});
