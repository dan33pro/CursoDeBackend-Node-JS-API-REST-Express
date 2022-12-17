const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

// Quemando productos
let products = [];
for (let i = 0; i < 200; i++) {
  products.push({
    id: i,
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    image: faker.image.imageUrl(),
    categoryID: Math.trunc(Math.random() * 19),
  });
}

router.get('/', (req, res) => {
  const { size } = req.query;
  if (parseInt(size)) {
    const productsR = products.slice(0, parseInt(size));
    res.json(productsR);
  } else {
    res.json(products);
  }
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = products.filter((product) => product.id == id);
  res.json(product);
});

router.post('/', (req, res) => {
  const body = req.body;
  products.push(body);
  res.json({
    message: 'created',
    data: body,
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  products = products.map((product) => {
    if ( product.id == id ) {
      return body;
    }
    return product;
  });

  res.json({
    message: 'update',
    data: body,
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  products = products.map((product) => {
    if ( product.id == id ) {
      return {
        ...product,
        ...body,
      };
    }
    return product;
  });

  res.json({
    message: 'update',
    data: body,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  products = products.filter((product) => product.id != id);

  res.json({
    message: 'deleted',
    id,
  });
});

module.exports = { router, products };
