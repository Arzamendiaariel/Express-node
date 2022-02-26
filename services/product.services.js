const faker = require('faker');

class ProductsService {

  constructor() {
    this.products = []; //aca luego tendriamos que asociarlo a una base de datos;
    this.generate() //cada vez que iniciemos el producto genere los 100
  }

  generate() {
    const limit = 100
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        description: faker.commerce.productDescription(),
        image: faker.image.imageUrl()
      })
    }
  };

  async create({ name, price, description, image }) {

    const newProduct = {
      id: faker.datatype.uuid(),
      name,
      price,
      description,
      image,
    }
    this.products.push(newProduct);
    return newProduct;
  };

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products),
          reject(err=> console.log(new Error(err)))
      }, 5000)
    })

  };

  async findOne(id) {
    const name = this.getTotal();
    return this.products.find(item => item.id === id);
  };

  async udpate(id, changes) {
    const index = this.products.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('product not found');
    }
    const product = this.products[index]
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index]
  };

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('product not found');
    };
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
