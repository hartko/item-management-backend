const itemDao = require('./item.dao');
exports.getItemById = async (id) => {
    const item = await itemDao.findById(id);
    return item;
};
exports.getItems = async (params) => {
    const query = {
        $or: [
            { name: { $regex: params.searchTerm, $options: 'i' } },  
            { description: { $regex: params.searchTerm, $options: 'i' } }  // Case-insensitive search on the description
        ]
    };
    // Pagination options
    const options = {
        page: parseInt(params.page, 10) || 1,
        limit: parseInt(params.limit, 10) || 10,
        sort: { createdAt: -1 },
    };
    const items = await itemDao.getItems(query,options);
    return items;
};
exports.create = async (item) => {
    const createItem = await itemDao.create(item);
    return createItem;
};
exports.update = async (item) => {
    const id = item.params.id;
    const updateData = item.body;
    const updateItem = await itemDao.update(id,updateData);
    return updateItem;
};
exports.deleteItem= async (item) => {
    const id = item.id;
    const deleteItem = await itemDao.delete(id);
    return deleteItem;
};