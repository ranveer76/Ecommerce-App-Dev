import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product',
    },
});

const Seller = mongoose.model('Seller', sellerSchema);

export default Seller;