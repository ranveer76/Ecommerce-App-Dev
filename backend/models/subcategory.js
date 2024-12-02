import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    image: {
        type: String,
        required: true,
    },
    products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product',
    },
});

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

export default SubCategory;