import { Category } from "modules/cars/model/Category";
import { DataSource } from "typeorm";


const dataSource = new DataSource({
    type: "postgres",
    host: "database", // Nome dado ao service do banco de dados
    port: 5432,
    username: "docker",
    password: "ignite",
    database: "rentx",
    entities: [Category],
    //migrationsTableName: ["CreateCategories"],
    migrations: ["./migrations/*.ts"],
});


dataSource.initialize();

export { dataSource }