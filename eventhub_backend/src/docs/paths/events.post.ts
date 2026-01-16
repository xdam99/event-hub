import { EventSchema } from "../schemas/event.schema";
import { CreateEventDTOSchema } from "../schemas/createEventDTO.schema";

export const postEventPath = {
    "/api/events": {
        post: {
            tags: ["Events"],
            summary: "Créer un nouvel événement",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: CreateEventDTOSchema
                    }
                }
            },
            responses: {
                "201": {
                    description: "Événement créé",
                    content: {
                        "application/json": {
                            schema: EventSchema
                        }
                    }
                }
            }
        }
    }
};
