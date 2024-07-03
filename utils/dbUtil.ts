import mysql,{ ConnectionOptions } from "mysql2/promise";

export default class DB {
  private DBConfig: ConnectionOptions = {
      host: "mysql-qa-testing-master-ncus.mysql.database.azure.com",
      user: "qaadmin",
      database: "aztenantadmin",
      password: "1wR?cHeQe_",
      port: 3306
  };

  async executeQuery(query: string): Promise<any[]> {
      const connection = await mysql.createConnection(this.DBConfig);
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