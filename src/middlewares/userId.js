const crypto = require("crypto");

const userIdGen = () => {
  const random = crypto.randomBytes(4).toString("hex").toUpperCase();

  return `INVPRO-${random}`;
};

export default userIdGen;