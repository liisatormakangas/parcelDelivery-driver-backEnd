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
    // Get list of free cabinets for a selected locker location
    getTransportedParcels: (lockerNumber) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = `SELECT * FROM parcel WHERE desired_pickup_locker = ? AND status = 'parcel_in_transportation'`;
            const result = yield dataBase_1.default.promise().query(query, [lockerNumber]);
            return result[0];
        }
        catch (e) {
            console.error(e.message);
            return `Error from cabinet model: ${e.message}`;
        }
    })
};
exports.default = parcel;
