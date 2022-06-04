
import request from "supertest";


import { Connection } from "typeorm";
import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import { app } from "@shared/infra/http/app";


import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Create Category Controller", async () => {


    beforeEach(async () => {
        connection = await createConnection();

        const id = uuidv4();

        const password = await hash("admin", 8);

        await connection.query(
            `INSERT INTO USERS(id,name,email,password,"isAdmin", created_at, driver_license)
                values('${id}', 'isAdmin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
            `
        );

    })
   
    it("should be able to create a new category", async () => {


        const responseToken = await request(app).post("/sessions")
        .send({
            email: "admin@rentx.com.br",
            password: "admin",
        });

        const response = await request(app)
        .post("/categories")
        .send({            
            name: "Category Sypertest",
            description: "Category Sypertest"
        });

        console.log(responseToken);

        expect(response.status).toBe(201);
    })

})

