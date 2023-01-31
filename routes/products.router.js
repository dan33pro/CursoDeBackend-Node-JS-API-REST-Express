const express = require('express');
const service = require('../services/products.service');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { size } = req.query;
    const numSize = parseInt(size);
    if (numSize) {
      res.json(await service.findWithSize(numSize));
    } else {
      res.json(await service.find());
    }
  } catch (error) {
    next(error);
  }
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({
        message: 'not found',
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  const respuesta = await service.create(body);
  res.status(201).json(respuesta);
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);

    res.json({
      message: 'update',
      data: product,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.partialUpdate(id, body);

    res.json({
      message: 'update',
      data: product,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productID = await service.delete(id);

    res.json({
      message: 'deleted',
      id: productID,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

module.exports = router;
