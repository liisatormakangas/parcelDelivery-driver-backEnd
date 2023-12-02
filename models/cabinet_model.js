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
    // Get all cabinets
    getAllCabinets: (lockerNumber) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = `SELECT * FROM locker WHERE locker_number = ?`;
            const result = yield dataBase_1.default.promise().query(query, [lockerNumber]);
            return result[0];
        }
        catch (e) {
            console.error(e.message);
            return `Error from cabinet model: ${e.message}`;
        }
    }),
    // Get list of free cabinet_ids for a selected locker location
    getAllFreeCabinets: function (lockerNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT id_cabinet
                FROM locker
                WHERE locker_number = ? AND locker.cabinet_status = 'free'`;
                const result = yield dataBase_1.default.promise().query(query, [lockerNumber]);
                const idCabinets_free = result[0].map(row => row.id_cabinet);
                return idCabinets_free;
            }
            catch (e) {
                console.error(e.message);
                return `Error from cabinet model: ${e.message}`;
            }
        });
    },
    // Extract cabinet_number values from the result of getAllFreeCabinets
    getAllFreeCabinetNumbers: function (lockerNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Call getAllFreeCabinets 
                const cabinetIds = yield this.getAllFreeCabinets(lockerNumber);
                // Use the cabinet IDs to retrieve cabinet numbers
                const query = `
                SELECT cabinet_number
                FROM locker
                WHERE id_cabinet IN (?);
            `;
                const [result] = yield dataBase_1.default.promise().query(query, [cabinetIds]);
                const cabinetNumbers = result.map(row => row.cabinet_number);
                console.log("Cabinet Numbers:", cabinetNumbers);
                return cabinetNumbers;
            }
            catch (e) {
                console.error(e.message);
                return `Error from cabinet model: ${e.message}`;
            }
        });
    },
    // convert locker number to locker id when give cabinet number
    getCabinetIdByNumber: function (lockerNumber, cabinetNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
                SELECT id_cabinet
                FROM locker
                WHERE locker_number = ? AND cabinet_number = ?;
            `;
                const [result] = yield dataBase_1.default.promise().query(query, [lockerNumber, cabinetNumber]);
                if (result.length > 0) {
                    // Return the cabinet ID if found
                    return result[0].id_cabinet;
                }
                else {
                    // Cabinet not found for the given locker and cabinet numbers
                    console.error('Cabinet not found:', lockerNumber, cabinetNumber);
                    return null;
                }
            }
            catch (e) {
                console.error(e.message);
                return `Error from cabinet model: ${e.message}`;
            }
        });
    },
};
exports.default = cabinet;
