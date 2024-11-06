const itemService = require('./item.service');
const { validationResult } = require('express-validator');
exports.getItem = async (req, res) => {
  try {
    const item = await itemService.getItemById(req.params.id);
    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error
    });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await itemService.getItems(req.query);
    res.status(200).json({
      ok: true,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error
    });
  }
};

exports.createItem = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(200).json({ ok: false, errors: errors.array() });
    }
    const items = await itemService.create(req.body);
    res.status(200).json({
      ok: true,
      msg: "Succesfully created!"

    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error
    });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({ ok: false, errors: errors.array() });
    }
    const items = await itemService.update(req);
    res.status(200).json({
      ok: true,
      data: items,
      msg: "Succesfully updated!"
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error
    });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const errors = validationResult(req.params);
    if (!errors.isEmpty()) {
      return res.status(200).json({ ok: false, errors: errors.array() });
    }
    const items = await itemService.deleteItem(req.params);
    res.status(200).json({
      ok: true,
      data: items,
      msg: "Succesffully deleted!"
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error
    });
  }
};
