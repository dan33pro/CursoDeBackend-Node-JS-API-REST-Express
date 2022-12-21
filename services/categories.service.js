const { faker } = require('@faker-js/faker');
const serviceProducts = require('./products.service');

class CategoriesService {
  constructor() {
    this.categories = [];
  }

  generate() {
    for (let i = 0; i < 20; i++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.department(),
      });
    }
  }

  async find() {
    return this.categories;
  }

  async findOne(id) {
    return this.categories.find((category) => category.id == id);
  }

  async findByCategory(categoryID) {
    return await serviceProducts.findByCategory(categoryID);
  }

  async findByCategoryAndName(categoryID, productName) {
    return await serviceProducts.findByCategoryAndName(categoryID, productName);
  }
}

const service = new CategoriesService();

module.exports = service;
