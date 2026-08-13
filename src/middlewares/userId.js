const userIdGen = () => {
  const prefix = "USR-";
  const random = Math.random().toString(36).slice(2, 10).toUpperCase();

  return `${prefix}${random}`;
};

export default userIdGen;