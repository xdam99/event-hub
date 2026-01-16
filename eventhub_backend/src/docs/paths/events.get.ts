import { EventSchema } from "../schemas/event.schema";

export const getEventsPath = {
    "/api/events": {
        get: {
            tags: ["Events"],
            summary: "Récupère tous les événements",
            responses: {
                "200": {
                    description: "Liste des événements",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: EventSchema
                            }
                        }
                    }
                }
            }
        }
    }
};

export const getEventByIdPath = {
    "/api/events/{id}": {
        get: {
            tags: ["Events"],
            summary: "Récupère un événement par son ID",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                    description: "ID de l'événement"
                }
            ],
            responses: {
                "200": {
                    description: "Événement trouvé",
                    content: {
                        "application/json": {
                            schema: EventSchema
                        }
                    }
                },
                "404": { description: "Événement non trouvé" }
            }
        }
    }
};
