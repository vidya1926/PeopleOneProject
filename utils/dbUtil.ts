import mysql from 'mysql2/promise';
import { test } from '../customFixtures/expertusFixture';
import { format, addMinutes } from 'date-fns';

export default class DB {
    private DBConfig: mysql.ConnectionOptions = {
        host: "mysql-qa-testing-master-ncus.mysql.database.azure.com",
        user: "qaadmin",
        database: "iris",
        password: "1wR?cHeQe_",
        port: 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    };
//"universal_profile"
    async executeQuery(query: string): Promise<any[]> {
        const connection = await mysql.createConnection(this.DBConfig);
        try {
            const [rows] = await connection.execute(query) as [any[], any];
            return rows;
        } catch (error) {
            console.error("Error in connection/executing query:", error);
            throw error;
        } finally {
            await connection.end().catch((error) => {
                console.error("Error ending connection:", error);
            });
        }
    }
}


