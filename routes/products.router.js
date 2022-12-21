const express = require('express');
const service = require('../services/product.service');

const router = express.Router();

router.get('/', (req, res) => {
  const { size } = req.query;
  const numSize = parseInt(size);
  if (numSize) {
    res.json(service.findWithSize(numSize));
  } else {
    res.json(service.find());
  }
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);
  if ( product ) {
    res.status(200).json(product);
  } else {
    res.status(404).json({
      message: 'not found',
    });
  }
});

router.post('/', (req, res) => {
  const body = req.body;
  service.create(body);
  res.status(201).json({
    message: 'created',
    data: body,
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  let estado = service.update(id, body);

  if ( estado ) {
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
  const estado = service.partialUpdate(id, body);

  if ( estado ) {
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
  const estado = service.delete(id);

  if ( estado ) {
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

module.exports = router;
