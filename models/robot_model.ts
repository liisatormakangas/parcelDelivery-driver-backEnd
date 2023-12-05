import connection from '../dataBase';
import { RowDataPacket } from 'mysql2';

const robot = {
    // Get all users from database
    getUsers: async () => {
        try {
            const query = "SELECT * FROM user";
            const [rows] = await connection.promise().query<RowDataPacket[]>(query);
            
            return rows;
        }
        catch (e: any) {
            console.error(e.message);
            return `Error from robot model: ${e.message}`;
        }
    },
    postParcel: async (parcel: any) => {
        try {
            const query = `INSERT INTO parcel SET ?`;
            const result = await connection.promise().query(query, [parcel]);
            return { success: true, message: 'Parcel added successfully' };
        }
        catch (e: any) {
            console.error(e.message);
            return { success: false, message: `Error from parcel model: ${e.message}` };
        }
    },
};
export default robot;