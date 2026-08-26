const express = require('express');
const { createCustomer, getAllCustomers, getCustomerById } = require('../controllers/customer.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

// Apply the "bouncer" to ALL customer routes below this line
router.use(protect);

router.post('/', createCustomer);
router.get('/', getAllCustomers);
router.get('/:id', getCustomerById);

module.exports = router;
