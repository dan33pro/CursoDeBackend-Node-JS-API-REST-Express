const express = require('express');
const service = require('../services/users.service');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { limit, offset } = req.query;
    if (limit && offset) {
      const nuLimit = parseInt(limit);
      const numOffset = parseInt(offset);
      const users = await service.findWithLimitAndOffset(nuLimit, numOffset);
      res.json(users);
    } else {
      res.json(await service.find());
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.findOne(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  await service.create(body);
  res.status(201).json({
    message: 'created',
    data: body,
  });
});

module.exports = router;
