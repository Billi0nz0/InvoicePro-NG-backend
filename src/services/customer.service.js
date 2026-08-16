// TEMPORARY DATABASE (We will replace with Prisma later)
const customers = [];

const createCustomer = async (userId, customerData) => {
  const newCustomer = {
    id: Date.now().toString(),
    userId, // Links this customer to the logged-in user
    ...customerData,
    createdAt: new Date().toISOString(),
  };
  customers.push(newCustomer);
  return newCustomer;
};

const getAllCustomers = async (userId) => {
  // Only return customers that belong to the logged-in user
  return customers.filter((customer) => customer.userId === userId);
};

const getCustomerById = async (userId, customerId) => {
  return customers.find((customer) => customer.id === customerId && customer.userId === userId);
};

module.exports = { createCustomer, getAllCustomers, getCustomerById };
