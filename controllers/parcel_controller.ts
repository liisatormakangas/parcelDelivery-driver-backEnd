import express from 'express';
import parcel from '../models/parcel_model';

const router = express.Router();

// Get list of parcels that need to deliver to desired locker by driver
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
//Update parcel status to "parcel_in_transportation" and pin_code to "NULL" based on id_parcel
router.put('/modifyParcelToTransport', async (req, res) => {
    const parcelId = parseInt(req.body.id_parcel);
    
    try {
        const result = await parcel.modifyParcelToTransport(parcelId);
        res.status(200).json(result);
    }
    catch (e: any) {
        console.error(e.message);
        res.status(500).send("Server error from cabinet controller");
    }
});



export default router;