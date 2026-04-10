const Salary = require('../../models/salary.model');
const createCrudController = require('../../utils/crudFactory');
const { buildDateFilter } = require('../../utils/buildDateFilter');
const { paginateQuery } = require('../../utils/paginateQuery');

const crud = createCrudController(Salary);

async function create(req, res, next) {
    try {
        const doc = await Salary.create({
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

        const doc = await Salary.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!doc) return res.status(404).json({ status: 'failed', message: 'Not found' });
        res.json({ status: 'success', data: doc });
    } catch (err) {
        next(err);
    }
}

async function list(req, res, next) {
    try {
        const filter = buildDateFilter(req.query);

        const docs =
            await Salary.paginate(filter, {
                page: parseInt(req.query.page) || 1,
                limit: parseInt(req.query.limit) || 10,
                sort: { createdAt: -1 },
            });

        res.json({
            status: "success",
            data: docs,
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { ...crud, create, update, list };