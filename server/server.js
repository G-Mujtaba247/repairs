import express from 'express';
import cors from 'cors';
import { dbConnect } from './config/db.js';
import webpageRouter from './routes/webpageRoutes.js';
import contactUsRouter from './routes/contactUsRoutes.js';
import aboutUsRouter from './routes/aboutUsRoutes.js';
import settingsRouter from './routes/settingsRoutes.js';

const app = express();

app.use(express.json());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(cors());

const PORT = process.env.PORT || 5000;
const PREFIX = '/api/v1';

app.use(PREFIX, webpageRouter);
app.use(PREFIX, contactUsRouter);
app.use(PREFIX, aboutUsRouter);
app.use(PREFIX, settingsRouter);

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

// about = {
//     mission: "To provide the best services.",
//     vision: "To be the leading company in our field.",
//     chooseUs: [{slug: "quality-service", title: "Quality Service"},
//                 {slug: "experienced-team", title: "Experienced Team"},
//                 {slug: "customer-support", title: "24/7 Customer Support"}]
// }