import mongoose from 'mongoose';

const policySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000
    },
    img: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Policy = mongoose.model('Policy', policySchema);

export default Policy;