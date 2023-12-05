import express from 'express';
import robot from '../models/robot_model';

const router = express.Router();

const shops = ["Amazon", "AliExpress", "eBay", "Verkkokauppa.com", "XXL", "AdLibris", "IKEA", "Bauhaus", "Decathlon", "H&M", "Zara",]
interface User {
    id_user: number;
    user_name: string;
    first_name: string;
    last_name: string;
    email: string;
    telephone: string;
    street_address: string;
    postal_code: string;
    city: string;
};

router.post(('/'), async (req, res) => {

    try {
        const users = await robot.getUsers();
        const randomNum = Math.floor(Math.random() * 3);

        if (randomNum === 2) return res.status(200).json({ message: "No parcels created" });

        for (let i = 0; i <= randomNum; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)] as User;
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
                const post = await robot.postParcel(parcelObj);
                console.log(post);
            }
            catch (e: any) {
                console.error(e.message);
                res.status(500).send("Server error from robot controller");
                throw e;
            }
        }
        res.status(200).json(users);
    }
    catch (e: any) {
        console.error(e.message);
        res.status(500).send("Server error from robot controller");
        throw e;
    }
});

export default router;