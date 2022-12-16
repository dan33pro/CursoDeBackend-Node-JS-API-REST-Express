const express = require('express');
const { faker } = require('@faker-js/faker');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Este es mi server en Express</h1>');
});

app.get('/new-route', (req, res) => {
  res.send('<h1>Esta es mi nueva ruta</h1>');
});

// Quemando productos
let products = [];
for ( let i = 0; i < 200; i++ ) {
  products.push({
    id: i,
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    image: faker.image.imageUrl(),
    categoryID: Math.trunc(Math.random()*19),
  });
}

// Quemando categorias
let categories = [];
for ( let i = 0; i < 20; i++ ) {
  categories.push({
    id: i,
    name: faker.commerce.department(),
  })
}

// Quemando usuarios
let users = [];
for (let i = 0; i < 20; i++) {
  users.push({
    id: i,
    name: faker.name.firstName(),
    phone: faker.phone.number(),
  });
}

app.get('/products', (req, res) => {
  const { size } = req.query;
  if ( parseInt(size) ) {
    const productsR = products.slice(0, parseInt(size));
    res.json(productsR);
  } else {
    res.json(products);
  }
});

app.get('/products/filter', (req, res) => {
  res.send('Yo soy un filter');
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

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if ( limit && offset ) {
    const usersR = [];
    const nuLimit = parseInt(limit);
    const numOffset = parseInt(offset);
    if ( (nuLimit + numOffset) - 1 < users.length ) {
      for ( let i = offset; i < nuLimit + numOffset; i++ ) {
        usersR.push(users[i]);
      }
    }
    res.json(usersR);
  } else {
    res.json(users);
  }
});

app.listen(port, () => {
  console.log('Corrinedo en: http://localhost:' + port);
});
