const express = require('express');
const service = require('../services/users.service');

const router = express.Router();

router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  if ( limit && offset ) {
    const nuLimit = parseInt(limit);
    const numOffset = parseInt(offset);
    if ( (nuLimit + numOffset) - 1 < service.size() ) {
      res.json(service.findWithLimitAndOffset(nuLimit, numOffset));
    } else {
      res.status(404).json({
        message: 'invalid querys',
      });
    }
  } else {
    res.json(service.find());
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = service.findOne(id);

  if ( user ) {
    res.json(user);
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

module.exports = router;
