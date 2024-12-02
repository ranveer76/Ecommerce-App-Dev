import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
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
    products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product',
    },
});

const Brand = mongoose.model('Brand', brandSchema);

export default Brand;