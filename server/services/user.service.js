import { inserUser, findIsUserExits } from "../repositories/user.repository.js";

export const createUserService = async (data) => {
  // Business logic here
  try{
    const existingUser = await findIsUserExits(data.username);
    if (existingUser) {
      throw new Error('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const user = await inserUser(data);
    return user;
  } catch(error) {
    next(error);
  }
};