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
const cabinet = {
    // Get list of free cabinets for a selected locker location
    getFreeCabinets: (lockerNumber) => __awaiter(void 0, void 0, void 0, function* () {
        const status = "free";
        try {
            const query = `SELECT * FROM locker WHERE locker_number = ? AND cabinet_status = ?`;
            const result = yield dataBase_1.default.promise().query(query, [lockerNumber, status]);
            if (result[0].length === 0) {
                return "No free cabinets";
            }
            return result[0];
        }
        catch (e) {
            console.error(e.message);
            return `Error from cabinet model: ${e.message}`;
        }
    })
};
exports.default = cabinet;
