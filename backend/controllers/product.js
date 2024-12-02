import Product from '../models/product.js';

const create = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.json(product);
    } catch (err) {
        res.status(400).send('Create product failed');
    }
};

const list = async (req, res) => {
    try {
        const { limit, filters, populate, sort } = req.body;
        const products = await Product.find(filters)
            .limit(limit)
            .populate(populate)
            .sort(sort)
            .exec();
        res.json(products);
    } catch (err) {
        res.status(400).send('List products failed');
    }
}

const read = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById({ id }).exec();
        res.json(product);
    } catch (err) {
        res.status(400).send('Read product failed');
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true }).exec();
        res.json(product);
    } catch (err) {
        res.status(400).send('Update product failed');
    }
}

const remove = async (req, res) => {
    try {
        const { slug } = req.params;
        const product = await Product.findByIdAndDelete(id).exec();
        res.json(product);
    } catch (err) {
        res.status(400).send('Delete product failed');
    }
}

export { create, list, read, update, remove };