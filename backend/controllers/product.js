import Product from '../models/product.js';

const create = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.json(product);
    } catch (err) {
        console.error('Create product failed:', err);
        res.status(400).json({
            error: 'Create product failed',
            message: err.message,
        });
    }
};


const list = async (req, res) => {
    try {
        const { limit, filters, populate, sort } = req.body;

        if (filters && typeof filters !== 'object') {
            return res.status(400).json({ error: 'Filters must be an object' });
        }

        if (populate && !Array.isArray(populate)) {
            return res
                .status(400)
                .json({ error: 'Populate must be an array of field names' });
        }

        const limitValue = limit || 10;

        if (sort && typeof sort !== 'object') {
            return res.status(400).json({ error: 'Sort must be an object' });
        }

        const products = await Product.find(filters)
            .limit(limitValue)
            .populate(populate)
            .sort(sort)
            .exec();

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        res.json(products);
    } catch (err) {
        res.status(400).send('List products failed');
        console.log(err);
    }
};


const read = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).exec();
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
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id).exec();
        res.json(product);
    } catch (err) {
        res.status(400).send('Delete product failed');
    }
}

export { create, list, read, update, remove };