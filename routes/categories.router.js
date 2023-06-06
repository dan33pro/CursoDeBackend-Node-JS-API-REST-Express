const express = require('express');
const service = require('../services/categories.service');
const { getCategorieSchema } = require('../schemas/categorie.schema');
const { getProductsWithNameSchema } = require('../schemas/product.schema');
const validatorHandler = require('../middlewares/validator.handler');

const router = express.Router();

router.get('/', async (req, res) => {
  res.json(await service.find());
});

router.get(
  '/:id',
  validatorHandler(getCategorieSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id/products',
  validatorHandler(getCategorieSchema, 'params'),
  async (req, res, next) => {
    try {
      const categoryID = req.params.id;
      const productsRes = await service.findByCategory(categoryID);
      res.json(productsRes);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id/products/:productName',
  validatorHandler(getCategorieSchema, 'params'),
  validatorHandler(getProductsWithNameSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id, productName } = req.params;
      const categoryID = id;
      const productsRes = await service.findByCategoryAndName(
        categoryID,
        productName
      );
      res.json(productsRes);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
