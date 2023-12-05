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
const robot_model_1 = __importDefault(require("../models/robot_model"));
const router = express_1.default.Router();
const shops = ["Amazon", "AliExpress", "eBay", "Verkkokauppa.com", "XXL", "AdLibris", "IKEA", "Bauhaus", "Decathlon", "H&M", "Zara",];
;
router.post(('/'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield robot_model_1.default.getUsers();
        const randomNum = Math.floor(Math.random() * 3);
        if (randomNum === 2)
            return res.status(200).json({ message: "No parcels created" });
        for (let i = 0; i <= randomNum; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const randomShop = shops[Math.floor(Math.random() * shops.length)];
            const parcelObj = {
                reciever_name: randomUser.first_name + " " + randomUser.last_name,
                reciever_telephone: randomUser.telephone,
                reciever_street_address: randomUser.street_address,
                reciever_postal_code: randomUser.postal_code,
                reciever_city: randomUser.city,
                receiver_email: randomUser.email,
                sender_name: randomShop,
                parcel_dropoff_date: new Date(),
                status: "parcel_in_transportation",
                desired_pickup_locker: Math.floor(Math.random() * 5) + 1,
                desired_dropoff_locker: Math.floor(Math.random() * 5) + 1,
                parcel_height: Math.floor(Math.random() * 50) + 1,
                parcel_width: Math.floor(Math.random() * 50) + 1,
                parcel_depth: Math.floor(Math.random() * 50) + 1,
                parcel_mass: Math.floor(Math.random() * 5) + 1,
            };
            try {
                const post = yield robot_model_1.default.postParcel(parcelObj);
                console.log(post);
            }
            catch (e) {
                console.error(e.message);
                res.status(500).send("Server error from robot controller");
                throw e;
            }
        }
        res.status(200).json(users);
    }
    catch (e) {
        console.error(e.message);
        res.status(500).send("Server error from robot controller");
        throw e;
    }
}));
exports.default = router;
