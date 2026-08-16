const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');

// MOCK DATABASE (We will replace this with Prisma later)
const users = [];

const registerUser = async (name, email, password) => {
  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  const token = generateToken(newUser.id);
  return { user: newUser, token };
};

const loginUser = async (email, password) => {
  const user = users.find((u) => u.email === email);
  
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user.id);
  return { user, token };
};

module.exports = { registerUser, loginUser };
