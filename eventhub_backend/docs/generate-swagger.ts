import swaggerJSDoc from "swagger-jsdoc";
import fs from "fs";
import swaggerOptions from "./swagger.config.js";

const swaggerSpec = swaggerJSDoc(swaggerOptions);

fs.writeFileSync("./docs/swagger-output.json", JSON.stringify(swaggerSpec, null, 2));

console.log("Swagger documentation generated successfully");