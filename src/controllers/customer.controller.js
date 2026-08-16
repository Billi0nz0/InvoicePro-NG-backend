const customerService = require('../services/customer.service');

const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    
    if (!name) {
      return res.status(400).json({ success: false, message: 'Customer name is required' });
    }

    // req.user.id comes from our Auth Middleware!
    const newCustomer = await customerService.createCustomer(req.user.id, { name, email, phone, address });
    
    res.status(201).json({ success: true, data: newCustomer });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const customers = await customerService.getAllCustomers(req.user.id);
    res.status(200).json({ success: true, count: customers.length, data: customers });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customer = await customerService.getCustomerById(req.user.id, req.params.id);
    
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }
    
    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { createCustomer, getAllCustomers, getCustomerById };
