import mysql, { ConnectionOptions } from 'mysql2/promise';
import { test } from '../customFixtures/expertusFixture';

export default class DB {
    private DBConfig: ConnectionOptions = {
        host: "mysql-qa-testing-master-ncus.mysql.database.azure.com",
        user: "qaadmin",
        database: "aztenantadmin",
        password: "1wR?cHeQe_",
        port: 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0

    };

    async executeQuery(query: string): Promise<any[]> {
        const connection = await mysql.createConnection(this.DBConfig);
        console.log(connection);

        try {
            const [rows] = await connection.execute<any[]>(query);
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

test('fetch data from database', async () => {
    const dataBase = new DB();
    try {
        const sample = await dataBase.executeQuery("");
        console.log(sample);
    } catch (error) {
        console.log("Not executed " + error);
    }
});
