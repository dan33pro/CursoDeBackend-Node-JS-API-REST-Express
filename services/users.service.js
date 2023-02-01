const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
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

  async find() {
    return this.users;
  }

  async findOne(id) {
    const user =  this.users.find((user) => user.id == id);
    if ( user ) {
      return user;
    }
    throw boom.notFound('user not found');
  }

  async findWithLimitAndOffset(nuLimit, numOffset) {
    const usersR = [];
    if ( (nuLimit + numOffset) - 1 < await service.size() ) {
      for ( let i = numOffset; i < nuLimit + numOffset; i++ ) {
        usersR.push({
          ...this.users[i],
        });
      }
      if ( usersR.length != 0 ) {
        return usersR;
      }
    }
    throw boom.notFound('invalid querys');
  }

  async create(user) {
    this.users.push(user);
  }

  async size() {
    return this.users.length;
  }
}

const service = new UsersService();

module.exports = service;
