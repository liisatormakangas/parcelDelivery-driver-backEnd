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
const dropoff_cabinet_model_1 = __importDefault(require("../models/dropoff_cabinet_model"));
const router = express_1.default.Router();
//Get list of free cabinets for a selected locker location
router.get('/allCabinets/:number', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lockerNumber = parseInt(req.params.number);
    try {
        const cabinets = yield dropoff_cabinet_model_1.default.getAllFreeCabinetNumbers(lockerNumber);
        res.status(200).json(cabinets);
    }
    catch (e) {
        console.error(e.message);
        res.status(500).send("Server error from cabinet controller");
    }
}));
exports.default = router;
