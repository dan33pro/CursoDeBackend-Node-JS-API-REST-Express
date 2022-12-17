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
    categoryID: Math.trunc(Math.random() * 20),
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
  if ( product.length == 0 ) {
    res.status(404).json({
      message: 'not found',
    });
  } else {
    res.status(200).json(product);
  }
});

router.post('/', (req, res) => {
  const body = req.body;
  products.push(body);
  res.status(201).json({
    message: 'created',
    data: body,
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  let semaforo = false;

  products = products.map((product) => {
    if ( product.id == id ) {
      semaforo = true;
      return body;
    }
    return product;
  });

  if ( semaforo ) {
    res.json({
      message: 'update',
      data: body,
    });
  } else {
    res.status(404).json({
      message: 'not found',
    })
  }
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  let semaforo = false;

  products = products.map((product) => {
    if ( product.id == id ) {
      semaforo = true;
      return {
        ...product,
        ...body,
      };
    }
    return product;
  });

  if ( semaforo ) {
    res.json({
      message: 'update',
      data: body,
    });
  } else {
    res.status(404).json({
      message: 'not found',
    });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let semaforo = false;

  products = products.filter((product) => {
    if ( product.id != id ) {
      return product;
    } else {
      semaforo = true;
    }
  });

  if ( semaforo ) {
    res.json({
      message: 'deleted',
      id,
    });
  } else {
    res.status(404).json({
      message: 'not found',
    });
  }
});

module.exports = { router, products };
