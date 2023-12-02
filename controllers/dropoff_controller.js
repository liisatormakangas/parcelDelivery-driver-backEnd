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
// Import necessary models and modules
const express_1 = __importDefault(require("express"));
const dropoff_model_1 = __importDefault(require("../models/dropoff_model"));
const cabinet_model_1 = __importDefault(require("../models/cabinet_model"));
const router = express_1.default.Router();
// Driver select parcel to dropoff and select cabinet in desired_pickup_locker
router.post('/dropoff', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { parcelId, lockerNumber, selectedCabinet, alternativeLockerNumber } = req.body;
    try {
        // Convert cabinet number to cabinet ID
        const cabinetId = yield cabinet_model_1.default.getCabinetIdByNumber(lockerNumber, selectedCabinet);
        if (cabinetId !== null) {
            // Driver selected a valid cabinet in the desired_pickup_locker
            yield dropoff_model_1.default.updatesAfterDriverDropoff(parcelId, cabinetId);
            res.status(200).json({ success: true, message: 'Dropoff successful' });
        }
        else {
            // Invalid cabinet selection or no free cabinets in the desired_pickup_locker
            // Driver should select an alternative_pickup_locker
            // Update the parcel table with the new locker number (assuming you have a method in dropoff_model for this)
            yield dropoff_model_1.default.updateParcelWithNewLocker(parcelId, alternativeLockerNumber);
            res.status(200).json({ success: true, message: 'Dropoff successful using new locker' });
        }
    }
    catch (error) {
        console.error('Dropoff error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}));
exports.default = router;
