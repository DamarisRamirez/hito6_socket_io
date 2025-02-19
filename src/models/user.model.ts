import { User } from './user';

const findAll = async () => {
  const users = await User.findAll();
  return users;
};

const findOneByEmail = async (email: string) => {
  const user = await User.findOne({
    where: { email },
  });
  return user;
};

const create = async (email: string, password: string) => {
  const newUser = await User.create({
    email,
    password,
  });
  return newUser;
};

export const userModel = {
  create,
  findOneByEmail,
  findAll,
};