import connection from '../dataBase';
import { RowDataPacket } from 'mysql2';

const cabinet = {
    // Get list of cabinets for a selected locker location
    getAllCabinets: async (lockerNumber: number) => {
        try {
            const query = `SELECT * FROM locker WHERE locker_number = ?`;
            const result = await connection.promise().query<RowDataPacket[]>(query, [lockerNumber]);
            
            return result[0];
        }
        catch (e: any) {
            console.error(e.message);
            return `Error from cabinet model: ${e.message}`;
        }
    },
    //Get all cabinets in selected parcel locker waiting for delivery (has_dropoff_parcel)
    getDropoffCabinets: async (lockerNumber: number) => {
        try {
            const query = `SELECT * FROM locker WHERE locker_number = ? AND cabinet_status = 'has_dropoff_parcel'`;
            const result = await connection.promise().query<RowDataPacket[]>(query, [lockerNumber]);

            return result[0];
        }
        catch (e: any) {
            console.error(e.message);
            return `Error from cabinet model: ${e.message}`;
        }
    },
    //Change cabinet status "free" and parcel_id "NULL" based on id_cabinet
    freeCabinet: async (cabinetId: number) => {
        try {
            const query = `UPDATE locker SET cabinet_status = 'free', parcel_id = NULL WHERE id_cabinet = ?`;
            const result = await connection.promise().query<RowDataPacket[]>(query, [cabinetId]);

            return { success: true, message: 'Cabinet freed successfully' };
        }
        catch (e: any) {
            console.error(e.message);
            return { success: false, message: `Error from cabinet model: ${e.message}` };
        }
    },

};

export default cabinet;