import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    subCategories: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'SubCategory',
    },
    products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product',
    },
});

const Category = mongoose.model('Category', categorySchema);

export default Category;