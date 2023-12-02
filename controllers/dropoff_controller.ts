// Import necessary models and modules
import express from 'express';
import dropoff_model from '../models/dropoff_model';
import cabinet_model from '../models/cabinet_model';

const router = express.Router();

// Driver select parcel to dropoff and select cabinet in desired_pickup_locker
router.post('/dropoff', async (req, res) => {
    const { parcelId, lockerNumber, selectedCabinet, alternativeLockerNumber } = req.body;

    try {
        // Convert cabinet number to cabinet ID
        const cabinetId = await cabinet_model.getCabinetIdByNumber(lockerNumber, selectedCabinet);

        if (cabinetId !== null) {
            // Driver selected a valid cabinet in the desired_pickup_locker
            await dropoff_model.updatesAfterDriverDropoff(parcelId, cabinetId);

            res.status(200).json({ success: true, message: 'Dropoff successful' });
        } else {
            // Invalid cabinet selection or no free cabinets in the desired_pickup_locker
            // Driver should select an alternative_pickup_locker
            // Update the parcel table with the new locker number (assuming you have a method in dropoff_model for this)
            await dropoff_model.updateParcelWithNewLocker(parcelId, alternativeLockerNumber);

            res.status(200).json({ success: true, message: 'Dropoff successful using new locker' });
        }
    } catch (error:any) {
        console.error('Dropoff error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
