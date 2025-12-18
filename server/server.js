import express from 'express';
import cors from 'cors';
import { dbConnect } from './config/db.js';
import webpageRouter from './routes/webpageRoutes.js';
import contactUsRouter from './routes/contactUsRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const PREFIX = '/api/v1';

app.use(PREFIX, webpageRouter);
app.use(PREFIX, contactUsRouter);
// Hello world
app.get('/test-server', async (req, res) => {
    return res.send({status: true, message: "Server is running"})
})

dbConnect().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is started http://localhost:${PORT}`)
    });
}).catch((err) => {
    console.log(err)
})