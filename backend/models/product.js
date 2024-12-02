import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        unique: true,
        index: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    description: {
        type: {},
        default: {
            description: '',
            features: '',
            specifications: '',
            reviews: '',
        }
    },
    productType: {
        type: String,
        enum: ['Product', 'Service', 'Subscription', 'Bundle', 'Gift Card', 'Digital Product'],
    },
    productCategory: {
        type: String,
        required: true,
    },
    productSubCategory: {
        type: String,
        required: true,
    },
    productBrand: {
        type: String,
        required: true,
    },
    shipping: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'No',
    },
    color: {
        type: String,
        required: true,
    },
    images: {
        type: Array,
    },
    ratings: [
        {
            star: Number,
            postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        },
    ],
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;