import Category from '../models/category';

const create = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.json(category);
    } catch (err) {
        console.error('Create category failed:', err);
        res.status(400).json({
            error: 'Create category failed',
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

        const categories = await Category.find(filters)
            .limit(limitValue)
            .populate(populate)
            .sort(sort)
            .exec();
        
        if (categories.length === 0) {
            return res.status(404).json({ message: 'No categories found' });
        }

        res.json(categories);
    }
    catch (err) {
        res.status(400).send('List categories failed');
        console.log(err);
    }
}

const read = async (req, res) => {
    try {
        const { id } = req.params;
        const { populate } = req.body;

        if (populate && !Array.isArray(populate)) {
            return res
                .status(400)
                .json({ error: 'Populate must be an array of field names' });
        }

        const category = await Category.findById(id).populate(populate).exec();
        res.json(category);
    }
    catch (err) {
        res.status(400).send('Read category failed');
        console.log(err);
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndUpdate(id, req.body, { new: true }).exec();
        res.json(category);
    }
    catch (err) {
        res.status(400).send('Update category failed');
        console.log(err);
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id).exec();
        res.json(category);
    }
    catch (err) {
        res.status(400).send('Delete category failed');
        console.log(err);
    }
}

export { create, list, read, update, remove };