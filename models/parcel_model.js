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
const dataBase_1 = __importDefault(require("../dataBase"));
const parcel = {
    // Get list of parcels that need to deliver to desired locker or alternative locker by driver
    getTransportedParcels: (lockerNumber) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = `SELECT id_parcel
             FROM parcel 
             WHERE 
                    CASE
                        WHEN alternative_pickup_locker IS NULL THEN desired_pickup_locker
                        ELSE alternative_pickup_locker
                    END = ? AND status = 'parcel_in_transportation';
                `;
            const [result] = yield dataBase_1.default.promise().query(query, [lockerNumber]);
            const idParcels = result.map(row => row.id_parcel);
            return idParcels;
        }
        catch (e) {
            console.error(e.message);
            return `Error from parcel model: ${e.message}`;
        }
    })
};
exports.default = parcel;
