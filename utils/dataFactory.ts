import { faker } from '@faker-js/faker';

export const newUser = () => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password({ length: 12 }),
});
