import express from 'express';
import dropoff_cabinet_model from '../models/dropoff_cabinet_model';
import dropoff_parcel_model from '../models/dropoff_parcel_model';

const router = express.Router();

// get information of locker
router.get('/locker/:number', async (req, res) => {
    const lockerNumber = parseInt(req.params.number);
    try {
        // get how many free cabinets are there
        const freeCabinets = await dropoff_cabinet_model.getAllFreeCabinetNumbers(lockerNumber);
        const numberOfFreeCabinets = freeCabinets.length;
        // get how many parcels to collect from the locker
        // const parcelsToCollect = await dropoff_parcel_model.getParcelsToCollect(lockerNumber);
        // const numberOfParcelsToCollect = parcelsToCollect.length;
        // get how many parcels to deliver to the locker
        const parcelsToDeliver = await dropoff_parcel_model.getTransportedParcels(lockerNumber);
        const numberOfParcelsToDeliver = parcelsToDeliver.length;  
        // get how many parcels are in the locker
        // const parcelsInLocker = await dropoff_parcel_model.getParcelsInLocker(lockerNumber);
        // const numberOfParcelsInLocker = parcelsInLocker.length;
        const lockerDetails = {
            freeCabinets: numberOfFreeCabinets,
            // parcelsToCollect: numberOfParcelsToCollect,
            parcelsToDeliver: numberOfParcelsToDeliver,
            // parcelsInLocker: numberOfParcelsInLocker
        };
        res.status(200).json(lockerDetails);
    }
    catch (e: any) {
        console.error(e.message);
        res.status(500).send("Server error from cabinet controller");
    }
}
);
export default router;
