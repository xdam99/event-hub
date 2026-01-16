const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info:{
            title: "Eventhub API",
            version: "1.0.6",
            description: "Documentation de l'API Eventhub"
        },
        servers: [
            {
                url: "http://localhost:8000/api",
                description: "Serveur de développement"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    apis: [
        "./src/docs/**/*.ts"
    ]
}

export default swaggerOptions;