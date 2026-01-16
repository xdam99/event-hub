import swaggerJSDoc from "swagger-jsdoc";
import fs from "fs";
import swaggerOptions from "./swagger.config";

const swaggerSpec = swaggerJSDoc(swaggerOptions);

fs.writeFileSync("./docs/swagger-output.json", JSON.stringify(swaggerSpec, null, 2));

console.log("Swagger documentation generated successfully");

const outputDir = path.join(__dirname, "swagger-output");
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

fs.writeFileSync(path.join(outputDir, "swagger.json"), JSON.stringify(swaggerSpec, null, 2));
console.log("Swagger JSON généré dans docs/swagger-output/swagger.json");
