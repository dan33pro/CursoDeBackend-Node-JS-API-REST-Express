const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    for (let i = 0; i < 200; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        image: faker.image.imageUrl(),
        categoryID: Math.trunc(Math.random() * 20),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(product) {
    const { name, description, price, image, categoryID } = product;
    const newProduct = {
      id: faker.datatype.uuid(),
      name,
      description,
      price,
      image,
      categoryID,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 3000);
    });
  }

  async findWithSize(size) {
    if ( size > 0 && size <= this.products.length ) {
      const products = this.products.slice(0, size);
      return products;
    }
    throw boom.notFound('invalid size');
  }

  async findOne(id) {
    const product = this.products.find((product) => product.id == id);
    if ( product.isBlock ) {
      throw boom.conflict('product is block');
    }
    if ( product ) {
      return product;
    }
    throw boom.notFound('product not found');
  }

  async findByCategory(categoryID) {
    const products = this.products.filter(
      (product) => product.categoryID == categoryID
    );
    if ( products.length != 0 ) {
      return products;
    }
    throw boom.notFound('product not found');
  }

  async findByCategoryAndName(categoryId, productName) {
    const products = this.products.filter(
      (product) => product.categoryID == categoryId && product.name == productName
    );
    if ( products.length != 0 ) {
      return products;
    }
    throw boom.notFound('product not found');
  }

  async update(id, body) {
    const index = this.products.findIndex(product => product.id === id);
    if ( index != -1 ) {
      this.products[index] = {
        id,
        ...body,
      };
      return this.products[index];
    }

    throw boom.notFound('product not found');
  }

  async partialUpdate(id, change) {
    const index = this.products.findIndex(product => product.id === id);
    if ( index != -1 ) {
      const antes = this.products[index];
      this.products[index] = {
        ...antes,
        ...change,
      }
      return this.products[index];
    }

    throw boom.notFound('product not found');
  }

  async delete(id) {
    const index = this.products.findIndex(product => product.id === id);
    if ( index != -1 ) {
      this.products.splice(index, 1);
      return { id };
    }

    throw boom.notFound('product not found');
  }
}

const service = new ProductsService();

module.exports = service;
