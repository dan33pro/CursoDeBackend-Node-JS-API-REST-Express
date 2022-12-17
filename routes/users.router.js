const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

// Quemando usuarios
let users = [];
for (let i = 0; i < 20; i++) {
  users.push({
    id: i,
    name: faker.name.firstName(),
    phone: faker.phone.number(),
  });
}

router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  if ( limit && offset ) {
    const usersR = [];
    const nuLimit = parseInt(limit);
    const numOffset = parseInt(offset);
    if ( (nuLimit + numOffset) - 1 < users.length ) {
      for ( let i = offset; i < nuLimit + numOffset; i++ ) {
        usersR.push(users[i]);
      }
    }
    res.json(usersR);
  } else {
    res.json(users);
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = users.filter((user) => user.id == id);
  res.json(user);
});

router.post('/', (req, res) => {
  const body = req.body;
  users.push(body);
  res.json({
    message: 'created',
    data: body,
  });
});

module.exports = router;
