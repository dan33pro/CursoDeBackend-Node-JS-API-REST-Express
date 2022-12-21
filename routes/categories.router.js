const express = require('express');
const service = require('../services/categories.service');

const router = express.Router();

router.get('/', async (req, res) => {
  res.json(await service.find());
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const category = await service.findOne(id);

  if ( category ) {
    res.json(category);
  } else {
    res.status(404).json({
      message: 'not found',
    });
  }

});

router.get('/:id/products', async (req, res) => {
  const categoryID = req.params.id;
  const productsRes = await service.findByCategory(categoryID);

  if ( productsRes.length != 0 ) {
    res.json(productsRes);
  } else {
    res.status(404).json({
      message: 'not found',
    });
  }
});

router.get('/:categoryId/products/:productName', async (req, res) => {
  const { categoryID, productName } = req.params;
  const productsRes = await service.findByCategoryAndName(categoryID, productName);

  if ( productsRes.length != 0 ) {
    res.json(productsRes);
  } else {
    res.status(404).json({
      message: 'not found',
    });
  }
});

module.exports = router;
