import express from 'express';
import cabinet from '../models/cabinet_model';

const router = express.Router();

//Get list of cabinets for a selected locker location
router.get('/allCabinets/:number', async (req, res) => {
    const lockerNumber = parseInt(req.params.number);

    try {
        const cabinets = await cabinet.getAllCabinets(lockerNumber);
        res.status(200).json(cabinets);
    }
    catch (e: any) {
        console.error(e.message);
        res.status(500).send("Server error from cabinet controller");
    }
});



//Get all cabinets in selected parcel locker waiting for delivery (has_dropoff_parcel)
router.get('/dropoffCabinets/:number', async (req, res) => {
    const lockerNumber = parseInt(req.params.number);

    try {
        const cabinets = await cabinet.getDropoffCabinets(lockerNumber);
        res.status(200).json(cabinets);
    }
    catch (e: any) {
        console.error(e.message);
        res.status(500).send("Server error from cabinet controller");
    }
});

//Change cabinet status "free" and parcel_id "NULL" based on id_cabinet
router.put('/freeCabinet', async (req, res) => {
    const cabinetId = parseInt(req.body.id_cabinet);

    try {
        const result = await cabinet.freeCabinet(cabinetId);
        res.status(200).json(result);
    }
    catch (e: any) {
        console.error(e.message);
        res.status(500).send("Server error from cabinet controller");
    }
});

// get locker numbers with free cabinets
router.get('/freeLockers', async (req, res) => {
    try {
        const lockers = await cabinet.getFreeLockers();
        res.status(200).json(lockers);
    }
    catch (e: any) {
        console.error(e.message);
        res.status(500).send("Server error from cabinet controller");
    }
});


export default router;