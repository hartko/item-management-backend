const Item = require('../models/item.model');

exports.findById = async (id) => {
  return await Item.findById(id);
};

exports.getItems = async (query,options) =>{
    const result = await Item.paginate(query, options);
    return result;
}

exports.create = async (item) =>{
  const result = await Item(item)
  .save();
  return result;
}

exports.update = async (id,update) =>{
  const result = await Item.findByIdAndUpdate( id,
    { $set: update },
    { new: true }
  );
  return result;
}

exports.delete = async (id,update) =>{
  const result = await Item.findByIdAndDelete(id);
  return result;
}