import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "Rent API",
        description: "Api created in a RocketSeat Course",
    },
    host: "localhost:3333",
    schemes: ["http"],
    components: {
        securitySchemes:{
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    },   
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./src/shared/infra/http/routes/index.ts"];

/* NOTE: if you use the express Router, you must pass in the 
     'endpointsFiles' only the root file where the route starts,
     such as index.js, app.js, routes.js, ... */

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc).then(async () => {
    await import("./src/shared/infra/http/server");
});
