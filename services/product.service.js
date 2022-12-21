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

  create(product) {
    this.products.push(product);
  }

  find() {
    return this.products;
  }

  findWithSize(size) {
    return this.products.slice(0, parseInt(size));
  }

  findOne(id) {
    return this.products.find((product) => product.id == id);
  }

  findByCategory(categoryID) {
    return this.products.filter(
      (product) => product.categoryID == categoryID
    );
  }

  findByCategoryAndName(categoryId, productName) {
    return this.products.filter(
      (product) => product.categoryID == categoryId && product.name == productName
    );
  }

  update(id, body) {
    let semaforo = false;

    this.products = this.products.map((product) => {
      if (product.id == id) {
        semaforo = true;
        return body;
      }
      return product;
    });

    return semaforo;
  }

  partialUpdate(id, body) {
    let semaforo = false;

    this.products = this.products.map((product) => {
      if (product.id == id) {
        semaforo = true;
        return {
          ...product,
          ...body,
        };
      }
      return product;
    });

    return semaforo;
  }

  delete(id) {
    let semaforo = false;

    this.products = this.products.filter((product) => {
      if (product.id != id) {
        return product;
      } else {
        semaforo = true;
      }
    });

    return semaforo;
  }
}

const service = new ProductsService();

module.exports = service;
