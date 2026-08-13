import crypto from "crypto";

const invoiceIdGen = () => {
  const random = crypto.randomBytes(4).toString("hex").toUpperCase();

  return `INVPRO-${random}`;
};

export default invoiceIdGen;