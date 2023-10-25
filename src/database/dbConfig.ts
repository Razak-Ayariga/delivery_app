import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { ConfigModule } from "@nestjs/config";
import { entities } from "./entities";

ConfigModule.forRoot();
export const dbConnection: MysqlConnectionOptions = ({
    type: "mysql",
    host: process.env.HOST,
    port: parseInt(process.env.PORT),
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    entities: entities,
    synchronize: true,
    logging: true
});
