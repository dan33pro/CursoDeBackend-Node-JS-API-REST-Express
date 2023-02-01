const express = require('express');
const service = require('../services/categories.service');

const router = express.Router();

router.get('/', async (req, res) => {
  res.json(await service.find());
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await service.findOne(id);
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/products', async (req, res, next) => {
  try {
    const categoryID = req.params.id;
    const productsRes = await service.findByCategory(categoryID);
    res.json(productsRes);
  } catch (error) {
    next(error);
  }
});

router.get('/:categoryID/products/:productName', async (req, res, next) => {
  try {
    const { categoryID, productName } = req.params;
    const productsRes = await service.findByCategoryAndName(
      categoryID,
      productName
    );
    res.json(productsRes);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
