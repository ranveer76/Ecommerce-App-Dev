import mongoose from 'mongoose';

const connect = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            return;
        }
        await mongoose.connect(process.env.DATABASE || 'mongodb://127.0.0.1:27017/Ecommerece', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log('DB connected');
        });
    }
    catch (err) {
        console.log('DB connection error', err);
    }
};

export default connect;