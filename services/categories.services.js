const faker = require('faker');

class CategoriesService {

  constructor() {
    this.categories = []; //aca luego tendriamos que asociarlo a una base de datos;
    this.generate () //cada vez que iniciemos el categoryo genere los 100
  }

  generate () {
  const limit= 50
  for (let i = 0; i < limit; i++){
    this.categories.push({
      id: faker.datatype.uuid(),
      categories: faker.commerce.department() ,
      image: faker.image.imageUrl()
    })
  }
  }

    create({ categories, image }) {

    const newCategory = {
      id: faker.datatype.uuid(),
      categories,
      image,
    }
    this.categories.push(newCategory);
    return newCategory;
  };

  find() {
    return this.categories
  }

  findOne(id) {
    return this.categories.find(item => item.id === id);
  }

  udpate(id, changes) {
    const index = this.categories.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('category not found');
    }
    const category= this.categories[index]
    this.categories[index] = {
      ...category,
      ...changes,
    };
    return this.categories[index]
  };

  delete(id) {
    const index = this.categories.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('category not found');
    };
    this.categories.splice(index, 1);
    return { id };
  }
}




module.exports = CategoriesService;
