const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const env = require("../config/env")
const { generateToken } = require('../utils/jwt');
const sendEmail = require("../services/email.service");
const emailVerificationTemplate = require ("../emailTemplates/emailVerificationTemplate");

// MOCK DATABASE (We will replace this with Prisma later)
const users = [];

const registerUser = async (name, email, password) => {
  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const verificationToken = crypto
    .randomBytes(32)
    .toString("hex");

  // Store only the hashed version in the DB
  const hashedVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
    isVerified: false,
    emailVerificationToken: hashedVerificationToken,
    emailVerificationExpires: Date.now() + 15 * 60 * 1000,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  const verificationURL =
    `${env.emailVerificationUrl}/${verificationToken}`;

  // Send verification email
  await sendEmail({
    to: newUser.email,
    subject: "Verify your email",
    html: emailVerificationTemplate({
      name: newUser.name,
      verificationURL,
    }),
  });

  return {
    user: newUser,

    message:
      "Account created successfully. Please check your email to verify your account.",
  };

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
