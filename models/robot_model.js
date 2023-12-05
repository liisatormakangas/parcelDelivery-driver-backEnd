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
const robot = {
    // Get all users from database
    getUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = "SELECT * FROM user";
            const [rows] = yield dataBase_1.default.promise().query(query);
            return rows;
        }
        catch (e) {
            console.error(e.message);
            return `Error from robot model: ${e.message}`;
        }
    }),
    postParcel: (parcel) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = `INSERT INTO parcel SET ?`;
            const result = yield dataBase_1.default.promise().query(query, [parcel]);
            return { success: true, message: 'Parcel added successfully' };
        }
        catch (e) {
            console.error(e.message);
            return { success: false, message: `Error from parcel model: ${e.message}` };
        }
    }),
};
exports.default = robot;
