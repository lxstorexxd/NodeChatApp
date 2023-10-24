const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');


module.exports.TableUsers = function (quantity = 5) {
    const Users = [];
    for (let index = 1; index < quantity; index++) {
        const user = {
            id: index,
            username: faker.internet.displayName,
            firstname: faker.person.firstName,
            lastname: faker.person.lastName,
            DateBirthday: faker.date.past,
            email: faker.internet.email,
            password: bcrypt.hashSync(faker.internet.password(), 10),
            isAdmin: false,
        };

        Users.push(user);
    }

    const admin = {
        id: 0,
        username: 'user',
        firstname: faker.person.firstName,
        lastname: faker.person.lastName,
        DateBirthday: faker.date.past,
        email: faker.internet.email,
        password: bcrypt.hashSync('password', 10),
        isAdmin: true,
    };
    Users.push(admin);

    return Users
}
