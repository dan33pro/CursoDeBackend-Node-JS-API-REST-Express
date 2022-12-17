const express = require('express');
const { faker } = require('@faker-js/faker');
const products = require('./products.router').products;

const router = express.Router();

// Quemando categorias
let categories = [];
for ( let i = 0; i < 20; i++ ) {
  categories.push({
    id: i,
    name: faker.commerce.department(),
  })
}

router.get('/', (req, res) => {
  res.json(categories);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const category = categories.filter((category) => category.id == id);

  if ( category.length != 0 ) {
    res.json(category);
  } else {
    res.status(404).json({
      message: 'not found',
    });
  }

});

router.get('/:id/products', (req, res) => {
  const categoryID = req.params.id;
  const productsRes = products.filter(
    (product) => product.categoryID == categoryID
  );

  if ( productsRes.length != 0 ) {
    res.json(productsRes);
  } else {
    res.status(404).json({
      message: 'not found',
    });
  }
});

router.get('/:categoryId/products/:productName', (req, res) => {
  const { categoryId, productName } = req.params;
  const productsRes = products.filter(
    (product) => product.categoryID == categoryId && product.name == productName
  );

  if ( productsRes.length != 0 ) {
    res.json(productsRes);
  } else {
    res.status(404).json({
      message: 'not found',
    });
  }
});

module.exports = router;
