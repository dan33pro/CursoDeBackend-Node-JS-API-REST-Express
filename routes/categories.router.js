const express = require('express');
const service = require('../services/categories.service');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(service.find());
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const category = service.findOne(id);

  if ( category ) {
    res.json(category);
  } else {
    res.status(404).json({
      message: 'not found',
    });
  }

});

router.get('/:id/products', (req, res) => {
  const categoryID = req.params.id;
  const productsRes = service.findByCategory(categoryID);

  if ( productsRes.length != 0 ) {
    res.json(productsRes);
  } else {
    res.status(404).json({
      message: 'not found',
    });
  }
});

router.get('/:categoryId/products/:productName', (req, res) => {
  const { categoryID, productName } = req.params;
  const productsRes = service.findByCategoryAndName(categoryID, productName);

  if ( productsRes.length != 0 ) {
    res.json(productsRes);
  } else {
    res.status(404).json({
      message: 'not found',
    });
  }
});

module.exports = router;
