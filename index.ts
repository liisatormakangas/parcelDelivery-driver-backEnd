import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import cabinetRouter from './controllers/cabinet_controller';
import parcelRouter from './controllers/parcel_controller';
import lockerDetailsRouter from './controllers/lockerDetails';

dotenv.config();
const PORT = 3001;
const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/cabinet', cabinetRouter);
app.use('/parcel', parcelRouter);
app.use('/lockerDetails', lockerDetailsRouter);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});