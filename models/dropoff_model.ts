import connection from '../dataBase';
import { RowDataPacket } from 'mysql2';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const dropoff = {
    // update parcel status to 'parcel_in_pickup_locker' and update cabinet status to 'has_pickup_parcel'
    updatesAfterDriverDropoff: async (parcelId: number, cabinetId: number): Promise<void> => {
        try {
            // add parcel id to selected cabinet
            await connection.promise().query(`UPDATE locker SET parcel_id = ? WHERE id_cabinet = ?`, [parcelId, cabinetId]);

            // update parcel status
            await connection.promise().query(`UPDATE parcel SET status = 'parcel_in_pickup_locker' WHERE id_parcel = ?`, [parcelId]);

            // update cabinet status
            await connection.promise().query(`UPDATE locker SET cabinet_status = 'has_pickup_parcel' WHERE id_cabinet = ?`, [cabinetId]);

            // create pickup code
            const pickupCode = Math.floor(1000 + Math.random() * 9000);
            await connection.promise().query(`UPDATE parcel SET pin_code = ? WHERE id_parcel = ?`, [pickupCode, parcelId]);

            // set parcel_readyforpickup_date
            const updateReadyForPickupDate = `
                UPDATE parcel
                SET parcel_readyforpickup_date = DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s')
                WHERE id_parcel = ?;
            `;
            await connection.promise().query(updateReadyForPickupDate, [parcelId]);

            // set parcel_last_pickup_date as parcel_readyforpickup_date+2days
            const updateLastPickupDate = `
                UPDATE parcel
                SET parcel_last_pickup_date = DATE_ADD(parcel_readyforpickup_date, INTERVAL 2 DAY)
                WHERE id_parcel = ?;
            `;
            await connection.promise().query(updateLastPickupDate, [parcelId]);

            // send email to receiver email with pickup code
            const selectEmail = `
                SELECT receiver_email
                FROM parcel
                WHERE id_parcel = ?;
            `;
            const [result] = await connection.promise().query<RowDataPacket[]>(selectEmail , [parcelId]);
            const receiverEmail = result[0].receiver_email; 
            console.log(receiverEmail);

            const getPickupLockerNumber = `
                SELECT locker_number
                FROM locker
                WHERE id_cabinet = ?;
            `;
            const [result2] = await connection.promise().query<RowDataPacket[]>(getPickupLockerNumber , [cabinetId]);
            const pickupLockerNumber = result2[0].locker_number;
           
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.APP_PASS,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: receiverEmail,
                subject: 'Parcel is ready for pickup',
                text: 
                `Dear Customer,
                Your parcel is ready for pickup at L${pickupLockerNumber}.
                Your pickup code is: ${pickupCode}.
                Parcel will be available for pickup for 2 days. If you can not pick up your parcel within 2 days, please contact our customer service: 0407890345 .
                 
                Thank you for using our service.
                DeliverMe Team`,
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log('Email sent successfully!');
            } catch (error: any) {
                console.error('Error sending email:', error.message);
                throw error;
            }
        } catch (error: any) {
            console.error(error.message);
            throw error;
        }
    },

    // update parcel table with alternative pickup locker number
    updateParcelWithNewLocker: async function (parcelId: number, lockerNumber: number) {
        try {
            const query = `
                UPDATE parcel
                SET alternative_pickup_locker = ?
                WHERE id_parcel = ?;
            `;
            await connection.promise().query(query, [lockerNumber, parcelId]);
        } catch (error: any) {
            console.error(error.message);
            throw error;
        }
    },
};

export default dropoff;
