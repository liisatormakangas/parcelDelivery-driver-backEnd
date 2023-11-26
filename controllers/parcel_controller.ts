import express from 'express';
import parcel from '../models/parcel_model';

const router = express.Router();

//Get list of free cabinets for a selected locker location
router.get('/transportParcels/:number', async (req, res) => {
    const lockerNumber = parseInt(req.params.number);
    try {
        const cabinets = await parcel.getTransportedParcels(lockerNumber);
        res.status(200).json(cabinets);
    }
    catch (e: any) {
        console.error(e.message);
        res.status(500).send("Server error from cabinet controller");
    }
});


export default router;