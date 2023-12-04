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
const dropoff = {
    // update parcel status to 'parcel_in_pickup_locker' and update cabinet status to 'has_pickup_parcel
    updatesAfterDriverDropoff: (parcelId, cabinetId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // add parcel id to selceted cabinet
            yield dataBase_1.default.promise().query(`UPDATE locker SET parcel_id = ? WHERE id_cabinet = ?`, [parcelId, cabinetId]);
            // update parcel status
            yield dataBase_1.default.promise().query(`UPDATE parcel SET status = 'parcel_in_pickup_locker' WHERE id_parcel = ?`, [parcelId]);
            // update cabinet status
            yield dataBase_1.default.promise().query(`UPDATE locker SET cabinet_status = 'has_pickup_parcel' WHERE id_cabinet = ?`, [cabinetId]);
            // create pickup code
            const pickupCode = Math.floor(1000 + Math.random() * 9000);
            yield dataBase_1.default.promise().query(`UPDATE parcel SET pin_code = ? WHERE id_parcel = ?`, [pickupCode, parcelId]);
            // set parcel_readyforpickup_date
            const updateReadyForPickupDate = `
                                        UPDATE parcel
                                        SET parcel_readyforpickup_date = DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s')
                                        WHERE id_parcel = ?;
                                        `;
            yield dataBase_1.default.promise().query(updateReadyForPickupDate, [parcelId]);
            // set parcel_last_pickup_date as parcel_readyforpickup_date+2days
            const updateLastPickupDate = `
                                    UPDATE parcel
                                    SET parcel_last_pickup_date = DATE_ADD(parcel_readyforpickup_date, INTERVAL 2 DAY)
                                    WHERE id_parcel = ?;
                                    `;
            yield dataBase_1.default.promise().query(updateLastPickupDate, [parcelId]);
        }
        catch (e) {
            console.error(e.message);
            throw e;
        }
    }),
    // update parcel table with alternative pickup locker number
    updateParcelWithNewLocker: function (parcelId, lockerNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
                UPDATE parcel
                SET alternative_pickup_locker = ?
                WHERE id_parcel = ?;
            `;
                yield dataBase_1.default.promise().query(query, [lockerNumber, parcelId]);
            }
            catch (e) {
                console.error(e.message);
                throw e;
            }
        });
    }
};
exports.default = dropoff;
