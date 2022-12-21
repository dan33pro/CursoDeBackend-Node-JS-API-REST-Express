const { faker } = require('@faker-js/faker');

class UsersService {
  constructor() {
    this.users = [];
  }

  generate() {
    for (let i = 0; i < 20; i++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        phone: faker.phone.number(),
      });
    }
  }

  find() {
    return this.users;
  }

  findOne(id) {
    return  this.users.find((user) => user.id == id);
  }

  findWithLimitAndOffset(nuLimit, numOffset) {
    const usersR = [];
    for ( let i = numOffset; i < nuLimit + numOffset; i++ ) {
      usersR.push({
        ...this.users[i],
      });
    }

    return usersR;
  }

  create(user) {
    this.users.push(user);
  }

  size() {
    return this.users.length;
  }
}

const service = new UsersService();

module.exports = service;
