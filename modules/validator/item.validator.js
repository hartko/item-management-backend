const { param, body } = require('express-validator');
const Item = require('../models/item.model');

// Check if has id
const validateItemId = () => {
    return [
        param('id')
            .isMongoId().withMessage('Invalid item ID format')
            .notEmpty().withMessage('Item ID is required')
    ];
};

// Validation for creating new Item
const validateCreateItem = () => {
    return [
        body('name')
            .notEmpty().withMessage('Name is required')
            .isString().withMessage('Name must be a string')
            .custom(async (value) => {
                // Check if the item name already exists
                const existingItem = await Item.findOne({ name: value });
                if (existingItem) {
                    throw new Error('An Item with this name already exists');
                }
                return true;
            }),
        body('description')
            .notEmpty().withMessage('Description is required'),
        body('price')
            .isFloat({ min: 0 }).withMessage('Price must be a positive number'),

        body('quantity')
            .isInt({ min: 0 }).withMessage('Quantity must be a positive integer')
    ];
};

// Validation for updating new Item
const validateUpdateItem = () => {
    return [
        param('id')
            .isMongoId().withMessage('Invalid item ID format')
            .notEmpty().withMessage('Item ID is required'),
        body('name')
            .notEmpty().withMessage('Name is required')
            .isString().withMessage('Name must be a string'),
        body('name')
            .notEmpty().withMessage('Name is required')
            .isString().withMessage('Name must be a string'),
        body('description')
            .notEmpty().withMessage('Description is required'),
        body('price')
            .isFloat({ min: 0 }).withMessage('Price must be a positive number'),

        body('quantity')
            .isInt({ min: 0 }).withMessage('Quantity must be a positive integer')
    ];
};

module.exports = { validateItemId, validateCreateItem, validateUpdateItem };
