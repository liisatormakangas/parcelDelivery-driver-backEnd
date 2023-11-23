import connection from '../dataBase';
import { RowDataPacket } from 'mysql2';

const cabinet = {
    // Get list of free cabinets for a selected locker location
    getFreeCabinets: async (lockerNumber: number) => {
        const status = "free";
        try {
            const query = `SELECT * FROM locker WHERE locker_number = ? AND cabinet_status = ?`;
            const result = await connection.promise().query<RowDataPacket[]>(query, [lockerNumber, status]);
            
            if (result[0].length === 0) {
                return "No free cabinets";
            }

            return result[0];
        }
        catch (e: any) {
            console.error(e.message);
            return `Error from cabinet model: ${e.message}`;
        }
    }
};

export default cabinet;