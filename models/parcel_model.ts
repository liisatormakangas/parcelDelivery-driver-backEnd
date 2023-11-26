import connection from '../dataBase';
import { RowDataPacket } from 'mysql2';

const parcel = {
    // Get list of free cabinets for a selected locker location
    getTransportedParcels: async (lockerNumber: number) => {
        try {
            const query = `SELECT * FROM parcel WHERE desired_pickup_locker = ? AND status = 'parcel_in_transportation'`;
            const result = await connection.promise().query<RowDataPacket[]>(query, [lockerNumber]);
            
            return result[0];
        }
        catch (e: any) {
            console.error(e.message);
            return `Error from cabinet model: ${e.message}`;
        }
    }
};

export default parcel;