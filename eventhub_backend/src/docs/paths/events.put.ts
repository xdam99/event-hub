import { EventSchema } from "../schemas/event.schema";
import { CreateEventDTOSchema } from "../schemas/createEventDTO.schema";

export const putEventPath = {
    "/api/events/{id}": {
        put: {
            tags: ["Events"],
            summary: "Met à jour un événement",
            parameters: [
                { name: "id", in: "path", required: true, schema: { type: "string" } }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": { schema: CreateEventDTOSchema }
                }
            },
            responses: {
                "200": {
                    description: "Événement mis à jour",
                    content: {
                        "application/json": { schema: EventSchema }
                    }
                },
                "404": { description: "Événement non trouvé" }
            }
        }
    }
};
