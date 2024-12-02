import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            default: 0,
        },
        offers: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Offer',
        },
        policies: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Policy',
        },
        description: {
            type: String,
            required: true,
        },
        details: {
            type: Object,
            default: {
                model: '',
                warranty: '',
            },
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        },
        subCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubCategory',
        },
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brand',
        },
        sellers: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Seller',
        },
        shipping: {
            type: String,
            enum: ['Yes', 'No'],
            default: 'No',
        },
        images: [
            {
                color: { type: String, required: true },
                urls: { type: [String], required: true },
            },
        ],
        colors: {
            type: [String],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

productSchema.pre('save', function (next) {
    const ObjectId = mongoose.Types.ObjectId;

        const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

        if (this.offers) {
            if (!this.offers.every((offer) => isValidObjectId(offer))) {
                return res
                    .status(400)
                    .json({ error: 'One or more offers are invalid ObjectId' });
            }
            this.offers = this.offers.map((offer) => new ObjectId(offer));
        }

        if (this.policies) {
            if (!this.policies.every((policy) => isValidObjectId(policy))) {
                return res
                    .status(400)
                    .json({
                        error: 'One or more policies are invalid ObjectId',
                    });
            }
            this.policies = this.policies.map((policy) => new ObjectId(policy));
        }

        if (this.category && !isValidObjectId(this.category)) {
            return res.status(400).json({ error: 'Invalid category ObjectId' });
        } else if (this.category) {
            this.category = new ObjectId(this.category);
        }

        if (this.subCategory && !isValidObjectId(this.subCategory)) {
            return res
                .status(400)
                .json({ error: 'Invalid subCategory ObjectId' });
        } else if (this.subCategory) {
            this.subCategory = new ObjectId(this.subCategory);
        }

        if (this.brand && !isValidObjectId(this.brand)) {
            console.log('Invalid brand ObjectId:', this.brand);
            return res.status(400).json({ error: 'Invalid brand ObjectId' });
        } else if (this.brand) {
            this.brand = new ObjectId(this.brand);
        }

        if (this.sellers) {
            if (!this.sellers.every((seller) => isValidObjectId(seller))) {
                return res
                    .status(400)
                    .json({
                        error: 'One or more seller ObjectIds are invalid',
                    });
            }
            this.sellers = this.sellers.map((seller) => new ObjectId(seller));
    }
    
    next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;