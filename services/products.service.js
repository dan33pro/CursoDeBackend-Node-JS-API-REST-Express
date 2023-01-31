const { faker } = require('@faker-js/faker');

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
    return this.products.slice(0, parseInt(size));
  }

  async findOne(id) {
    // const error = this.sorry();
    return this.products.find((product) => product.id == id);
  }

  async findByCategory(categoryID) {
    return this.products.filter(
      (product) => product.categoryID == categoryID
    );
  }

  async findByCategoryAndName(categoryId, productName) {
    return this.products.filter(
      (product) => product.categoryID == categoryId && product.name == productName
    );
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

    throw new Error('product not found');
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

    throw new Error('product not found');
  }

  async delete(id) {
    const index = this.products.findIndex(product => product.id === id);
    if ( index != -1 ) {
      this.products.splice(index, 1);
      return { id };
    }

    throw new Error('product not found');
  }
}

const service = new ProductsService();

module.exports = service;
