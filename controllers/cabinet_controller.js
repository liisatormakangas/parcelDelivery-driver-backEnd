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
const cabinet_model_1 = __importDefault(require("../models/cabinet_model"));
const router = express_1.default.Router();
//Get list of cabinets for a selected locker location
router.get('/allCabinets/:number', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lockerNumber = parseInt(req.params.number);
    try {
        const cabinets = yield cabinet_model_1.default.getAllCabinets(lockerNumber);
        res.status(200).json(cabinets);
    }
    catch (e) {
        console.error(e.message);
        res.status(500).send("Server error from cabinet controller");
    }
}));
//Get all cabinets in selected parcel locker waiting for delivery (has_dropoff_parcel)
router.get('/dropoffCabinets/:number', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lockerNumber = parseInt(req.params.number);
    try {
        const cabinets = yield cabinet_model_1.default.getDropoffCabinets(lockerNumber);
        res.status(200).json(cabinets);
    }
    catch (e) {
        console.error(e.message);
        res.status(500).send("Server error from cabinet controller");
    }
}));
//Change cabinet status "free" and parcel_id "NULL" based on id_cabinet
router.put('/freeCabinet', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cabinetId = parseInt(req.body.id_cabinet);
    try {
        const result = yield cabinet_model_1.default.freeCabinet(cabinetId);
        res.status(200).json(result);
    }
    catch (e) {
        console.error(e.message);
        res.status(500).send("Server error from cabinet controller");
    }
}));
exports.default = router;
