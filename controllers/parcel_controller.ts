import express from 'express';
import parcel from '../models/parcel_model';
import dropoff_model from '../models/dropoff_model';

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

// update parcel and locker table after driver dropoff
router.put('/modifyAfterDriverDropoff', async (req, res) => {
    const { parcelId,  selectedCabinet } = req.body;

    try {
        // Convert cabinet number to cabinet ID
        // const cabinetId = await cabinet_model.getCabinetIdByNumber(lockerNumber, selectedCabinet);
            const result = await dropoff_model.updatesAfterDriverDropoff(parcelId, selectedCabinet);
            res.status(200).json(result);
        }
    catch (error:any) {
        console.error('Dropoff error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
// update parcel table with alternative pickup locker number
router.put('/updateParcelWithNewLocker', async (req, res) => {
    const { parcelId,  lockerNumber } = req.body;

    try {
        const result = await dropoff_model.updateParcelWithNewLocker(parcelId, lockerNumber);
        res.status(200).json(result);
    }
    catch (error:any) {
        console.error('Dropoff error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});



export default router;