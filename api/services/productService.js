const { faker } = require('@faker-js/faker');

const boom = require('@hapi/boom');

class ProductService {
  constructor() {
    this.products = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      try {
        this.products.push({
          id: faker.string.uuid(),
          name: faker.commerce.productName(),

          price: faker.number.int({ min: 100, max: 1000 }),
          description: faker.commerce.productDescription(),
          image: faker.image.url(),
          isBlock: faker.datatype.boolean(),
        });
      } catch (error) {
        console.log(error);
        console.log(error.message);
      }
    }
  }

  create(data) {
    const product = {
      id: faker.string.uuid(),
      ...data,
    };
    this.products.push(product);
    return product;
  }
  find() {
    return this.products;
  }
  findOne(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('Product is blocked');
    }
    return product;
  }
  update(id, data) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...data,
    };
    return this.products[index];
  }
  delete(id) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductService;
