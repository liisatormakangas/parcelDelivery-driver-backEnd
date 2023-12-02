import connection from '../dataBase';
import { RowDataPacket } from 'mysql2';

const dropoff = {
 
    // update parcel status to 'parcel_in_pickup_locker' and update cabinet status to 'has_pickup_parcel
    updatesAfterDriverDropoff: async (parcelId: number, cabinetId: number) :  Promise<void> => {
    try{
        // add parcel id to selceted cabinet
        await connection.promise().query(`UPDATE locker SET parcel_id = ? WHERE id_cabinet = ?`, [parcelId, cabinetId]);
        
        // update parcel status
        await connection.promise().query(`UPDATE parcel SET status = 'parcel_in_pickup_locker' WHERE id_parcel = ?`, [parcelId]);
        
        // update cabinet status
        await connection.promise().query(`UPDATE locker SET cabinet_status = 'has_pickup_parcel' WHERE id_cabinet = ?`, [cabinetId]);
    
        // create pickup code
        const pickupCode = Math.floor(1000 + Math.random() * 9000);
        await connection.promise().query(`UPDATE parcel SET pin_code = ? WHERE id_parcel = ?`, [pickupCode, parcelId]);
        
        // set parcel_readyforpickup_date
        const updateReadyForPickupDate =`
                                        UPDATE parcel
                                        SET parcel_readyforpickup_date = DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s')
                                        WHERE id_parcel = ?;
                                        `;
        await connection.promise().query(updateReadyForPickupDate, [parcelId]);

        // set parcel_last_pickup_date as parcel_readyforpickup_date+2days
        const updateLastPickupDate =`
                                    UPDATE parcel
                                    SET parcel_last_pickup_date = DATE_ADD(parcel_readyforpickup_date, INTERVAL 2 DAY)
                                    WHERE id_parcel = ?;
                                    `;
        await connection.promise().query(updateLastPickupDate, [parcelId]);
        } catch (e: any) {
            console.error(e.message);
            throw e;
        }
    },
    updateParcelWithNewLocker: async function(parcelId: number, lockerNumber: number) {
        try {
            const query = `
                UPDATE parcel
                SET alternative_pickup_locker = ?
                WHERE id_parcel = ?;
            `;
            await connection.promise().query(query, [lockerNumber, parcelId]);
        } catch (e: any) {
            console.error(e.message);
            throw e;
        }
    }
}

export default dropoff;