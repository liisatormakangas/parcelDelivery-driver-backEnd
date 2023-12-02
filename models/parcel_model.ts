import connection from '../dataBase';
import { RowDataPacket } from 'mysql2';

const parcel = {
    // Get list of parcels that need to deliver to desired locker or alternative locker by driver
    getTransportedParcels: async (lockerNumber: number) => {
        try {
            const query = `SELECT id_parcel
             FROM parcel 
             WHERE 
                    CASE
                        WHEN alternative_pickup_locker IS NULL THEN desired_pickup_locker
                        ELSE alternative_pickup_locker
                    END = ? AND status = 'parcel_in_transportation';
                `;
            const [result] = await connection.promise().query<RowDataPacket[]>(query, [lockerNumber]);
            const idParcels = result.map(row => row.id_parcel);
            return idParcels;
        }
        catch (e: any) {
            console.error(e.message);
            return `Error from parcel model: ${e.message}`;
        }
    }
};

export default parcel;