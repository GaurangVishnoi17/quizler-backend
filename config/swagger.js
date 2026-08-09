const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Quizler Backend API",
            version: "1.0.0",
            description: "REST API for the Quizler application"
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local Development Server"
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },
            schemas: {
                LoginRequest: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: {
                            type: "string",
                            format: "email",
                            example: "john@example.com"
                        },
                        password: {
                            type: "string",
                            example: "Password@123"
                        }
                    }
                },
                LoginResponse: {
                    type: "object",
                    properties: {
                        accessToken: {
                            type: "string",
                            description: "JWT access token"
                        },
                        refreshToken: {
                            type: "string",
                            description: "JWT refresh token"
                        }
                    }
                },
                Question: {
                    type: "object",
                    properties: {
                        question: {
                            type: "string",
                            example: "What is Node.js?"
                        },
                        answer: {
                            type: "string",
                            example: "A JavaScript runtime built on Chrome's V8 engine."
                        }
                    }
                },
                ErrorResponse: {
                    type: "object",
                    properties: {
                        error: {
                            type: "string",
                            example: "Invalid email or password"
                        }
                    }
                },
                ValidationErrorResponse: {
                    type: "object",
                    properties: {
                        errors: {
                            type: "array",
                            items: {
                                type: "object"
                            }
                        }
                    }
                }
            }
        }
    },
    apis: [
        "./routes/*.js"
    ]
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = {
    swaggerUi,
    swaggerSpec
};