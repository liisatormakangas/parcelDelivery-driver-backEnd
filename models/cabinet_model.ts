import connection from '../dataBase';
import { RowDataPacket } from 'mysql2';

const cabinet = {
    // Get all cabinets
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
    
    // Get list of free cabinet_ids for a selected locker location
    getAllFreeCabinets: async function(lockerNumber: number) {
        try {
            const query = `SELECT id_cabinet
                FROM locker
                WHERE locker_number = ? AND locker.cabinet_status = 'free'`;
            const result = await connection.promise().query<RowDataPacket[]>(query, [lockerNumber]);
            const idCabinets_free = result[0].map(row => row.id_cabinet);
            return idCabinets_free;
        } catch (e: any) {
            console.error(e.message);
            return `Error from cabinet model: ${e.message}`;
        }
    },
    // Extract cabinet_number values from the result of getAllFreeCabinets
    getAllFreeCabinetNumbers: async function(lockerNumber: number) {
        try {
            // Call getAllFreeCabinets 
            const cabinetIds = await this.getAllFreeCabinets(lockerNumber);

            // Use the cabinet IDs to retrieve cabinet numbers
            const query = `
                SELECT cabinet_number
                FROM locker
                WHERE id_cabinet IN (?);
            `;

            const [result] = await connection.promise().query<RowDataPacket[]>(query, [cabinetIds]);

            const cabinetNumbers = result.map(row => row.cabinet_number);
            console.log("Cabinet Numbers:", cabinetNumbers);
            return cabinetNumbers;
            
        } catch (e: any) {
            console.error(e.message);
            return `Error from cabinet model: ${e.message}`;
        }
    },
    // convert locker number to locker id when give cabinet number
    getCabinetIdByNumber: async function(lockerNumber: number, cabinetNumber: number) {
        try {
            const query = `
                SELECT id_cabinet
                FROM locker
                WHERE locker_number = ? AND cabinet_number = ?;
            `;
            const [result] = await connection.promise().query<RowDataPacket[]>(query, [lockerNumber, cabinetNumber]);

            if (result.length > 0) {
                // Return the cabinet ID if found
                return result[0].id_cabinet;
            } else {
                // Cabinet not found for the given locker and cabinet numbers
                console.error('Cabinet not found:', lockerNumber, cabinetNumber);
                return null; 
            }
        } catch (e: any) {
            console.error(e.message);
            return `Error from cabinet model: ${e.message}`;
        }
    },
 
    
};

export default cabinet;
