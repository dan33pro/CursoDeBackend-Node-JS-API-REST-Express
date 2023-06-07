const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const serviceProducts = require('./products.service');

class CategoriesService {
  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    for (let i = 0; i < 20; i++) {
      this.categories.push({
        id: i + 1,
        name: faker.commerce.department(),
      });
    }
  }

  async find() {
    return this.categories;
  }

  async findOne(id) {
    const category = this.categories.find((category) => category.id == id);
    if ( category ) {
      return category;
    }
    throw boom.notFound('category not found');
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
