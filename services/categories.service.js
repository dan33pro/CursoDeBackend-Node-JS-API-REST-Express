const { faker } = require('@faker-js/faker');
const serviceProducts = require('../services/product.service');

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

  find() {
    return this.categories;
  }

  findOne(id) {
    return this.categories.find((category) => category.id == id);
  }

  findByCategory(categoryID) {
    return serviceProducts.findByCategory(categoryID);
  }

  findByCategoryAndName(categoryID, productName) {
    return serviceProducts.findByCategoryAndName(categoryID, productName);
  }
}

const service = new CategoriesService();

module.exports = service;
