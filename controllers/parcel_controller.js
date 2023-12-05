"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const parcel_model_1 = __importDefault(require("../models/parcel_model"));
const dropoff_model_1 = __importDefault(require("../models/dropoff_model"));
const router = express_1.default.Router();
// Get list of parcels that need to deliver to desired locker by driver
router.get('/transportParcels/:number', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lockerNumber = parseInt(req.params.number);
    try {
        const cabinets = yield parcel_model_1.default.getTransportedParcels(lockerNumber);
        res.status(200).json(cabinets);
    }
    catch (e) {
        console.error(e.message);
        res.status(500).send("Server error from cabinet controller");
    }
}));
//Update parcel status to "parcel_in_transportation" and pin_code to "NULL" based on id_parcel
router.put('/modifyParcelToTransport', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parcelId = parseInt(req.body.id_parcel);
    try {
        const result = yield parcel_model_1.default.modifyParcelToTransport(parcelId);
        res.status(200).json(result);
    }
    catch (e) {
        console.error(e.message);
        res.status(500).send("Server error from cabinet controller");
    }
}));
// update parcel and locker table after driver dropoff
router.put('/modifyAfterDriverDropoff', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { parcelId, selectedCabinet } = req.body;
    try {
        // Convert cabinet number to cabinet ID
        // const cabinetId = await cabinet_model.getCabinetIdByNumber(lockerNumber, selectedCabinet);
        const result = yield dropoff_model_1.default.updatesAfterDriverDropoff(parcelId, selectedCabinet);
        res.status(200).json(result);
    }
    catch (error) {
        console.error('Dropoff error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}));
// update parcel table with alternative pickup locker number
router.put('/updateParcelWithNewLocker', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { parcelId, lockerNumber } = req.body;
    try {
        const result = yield dropoff_model_1.default.updateParcelWithNewLocker(parcelId, lockerNumber);
        res.status(200).json(result);
    }
    catch (error) {
        console.error('Dropoff error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}));
exports.default = router;
