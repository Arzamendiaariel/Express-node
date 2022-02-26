const faker = require('faker');

class UsersService {

  constructor() {
    this.users = []; //aca luego tendriamos que asociarlo a una base de datos;
    this.generate () //cada vez que iniciemos el usero genere los 100
  }

  generate () {
    const limit = 20;
  for (let i = 0; i < limit; i++){
    this.users.push({
      id: faker.datatype.uuid(),
      name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      image: faker.image.avatar()
    })
  }
  }
  create({ name, last_name ,email, image }) {

    const newUser = {
      id: faker.datatype.uuid(),
      name,
      last_name,
      email,
      image,
    }
    this.users.push(newUser);
    return newUser;
  };

  find() {
    return this.users
  }

  findOne(id) {
    return this.users.find(item => item.id === id);
  }

  udpate(id, changes) {
    const index = this.users.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('user not found');
    }
    const user= this.users[index]
    this.users[index] = {
      ...user,
      ...changes,
    };
    return this.users[index]
  };

  delete(id) {
    const index = this.users.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('user not found');
    };
    this.users.splice(index, 1);
    return { id };
  }
}



module.exports = UsersService;
