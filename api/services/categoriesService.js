const { faker } = require('@faker-js/faker');

const boom = require('@hapi/boom');

class CategoriesService {
  constructor() {
    this.categories = [];
    this.generate();
  }
  generate() {
    const limit = 20;
    for (let i = 0; i < limit; i++) {
      try {
        this.categories.push({
          id: faker.string.uuid(),
          name: faker.commerce.department(),
        });
      } catch (error) {
        throw boom.internal('Error generating categories: ' + error.message);
      }
    }
  }
  create(data) {
    const category = {
      id: faker.string.uuid(),
      ...data,
    };
    this.categories.push(category);
    return category;
  }
  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.categories);
        if (this.categories.length === 0) {
          reject(boom.notFound('No products found'));
        }
      }, 2000);
    });
  }
  findOne(id) {
    return new Promise((resolve, reject) => {
      const category = this.categories.find((category) => category.id === id);
      if (!category) {
        reject(boom.notFound('Category not found'));
      } else {
        resolve(category);
      }
    });
  }
  update(id, data) {
    const index = this.categories.findIndex((category) => category.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...data,
    };
    return this.categories[index];
  }
  delete(id) {
    const index = this.categories.findIndex((category) => category.id === id);

    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    this.categories.splice(index, 1);
    return { id };
  }
}

module.exports = CategoriesService;
