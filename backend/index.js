import dotenv from 'dotenv';
dotenv.config();
import expressasyncHandler from 'express-async-handler';
expressasyncHandler();
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { readdir } from 'fs';
import cors from 'cors';
import { join } from 'path';
import connect from './config/db.js';
const app = express();
connect().then(() => {
    console.log('DB connected');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(join('public')));

readdir('./routes', (err, files) => {
    if (err) {
        console.log(err);
    } else {
        files.forEach(file => {
            if (file.endsWith('.js')) {
                import(`./routes/${file}`).then(route => {
                    app.use('/api', route.default);
                });
            }
        });
    }
});

app.use((req, res, next, err) => {
    console.log(err);
    next();
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.clear();
    console.log(`Server is running on http://localhost:${port}`);
});