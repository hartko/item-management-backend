const express = require('express');
const router = express.Router();
const { validateItemId, validateCreateItem, validateUpdateItem} = require('../validator/item.validator'); 
const middleware = require('../auth/auth.jwt');

const itemController = require('./item.controller');
router.use(middleware);
router.get('/', itemController.getItems);
router.post('/', validateCreateItem(),itemController.createItem);
router.put('/:id', validateUpdateItem(),itemController.updateItem);
router.delete('/:id',validateItemId() ,itemController.deleteItem);

module.exports = router;