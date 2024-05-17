import swaggerJSDoc from "swagger-jsdoc";
import { PORT } from "./index.js";

const options = {
          definition: {
            openapi: "3.1.0",
            info: {
              title: "Volunteer work project",
              version: "0.1.0",
              description:
                "This is a simple CRUD API application for volunteer work project",
              license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
              },
              contact: {
                name: "HungTran",
                url: "https://google.com",
                email: "22520527@gmail.uit.edu.vn",
              },
            },
            servers: [
              {
                url: `http://localhost:${PORT}`,
              },
            ],
          },
          apis: ["../Swagger/swagger-doc.yml"],
};
const SwaggerConfig=swaggerJSDoc(options);