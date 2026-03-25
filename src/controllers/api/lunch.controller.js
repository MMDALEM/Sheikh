const lunchModel = require('../../models/lunch.model');
const createCrudController = require("../../utils/crudFactory");

const crud = createCrudController(lunchModel);

async function create(req, res, next) {
    try {
        const doc = await lunchModel.create({
            name: req.body.name,
            date: req.body.date,
            desc: req.body.desc,
            price: req.body.price,
            list: req.body.list || [],
        });
        res.status(201).json({ status: 'success', data: doc });
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const updateData = {};
        if (req.body.name !== undefined) updateData.name = req.body.name;
        if (req.body.date !== undefined) updateData.date = req.body.date;
        if (req.body.desc !== undefined) updateData.desc = req.body.desc;
        if (req.body.price !== undefined) updateData.price = req.body.price;
        if (req.body.list !== undefined) updateData.list = req.body.list;

        const doc = await lunchModel.findByIdAndUpdate(req.params.id, updateData);
        if (!doc) return res.status(404).json({ status: 'failed', message: 'Not found' });
        res.json({ status: 'success', data: doc });
    } catch (err) {
        next(err);
    }
}

module.exports = { ...crud, create, update };