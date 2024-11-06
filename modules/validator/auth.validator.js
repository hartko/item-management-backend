const { body } = require('express-validator');
const User = require('../models/user.model');
// Login validation
const loginValidation = () => {
  return [
    // Validate email
    body('email')
      .isEmail().withMessage('Please enter a valid email address')
      .notEmpty()
      .withMessage('Email is required'),
    // Validate password
    body('password')
      .isLength({ min: 6 }).withMessage('Password should be at least 6 characters long')
  ]
};
// Register validation

// Validation for creating new Item
const registerValidation = () => {
  return [
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Please enter a valid email address')
      .custom(async (value) => {
        // Check if the item name already exists
        const existingItem = await User.findOne({ email: value });
        if (existingItem) {
          throw new Error('Email is already in use');
        }
        return true;
      }),
    body('password')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
      .notEmpty().withMessage('Password is required')
      .matches(/\d/).withMessage('Password must contain at least one number'),
    body('confirmPassword')
      .notEmpty()
      .withMessage('Confirm password is required')
      .custom((value, { req }) => {
        // Ensure password and confirmPassword match
        console.log('value', value); // This logs the confirmPassword value
        console.log('body', req.body); // This logs the entire request body
        if (value !== req.body.password) {
          throw new Error('Passwords must match');
        }
        return true;
      }),
  ];
};
module.exports = { loginValidation, registerValidation };
