export const deleteEventPath = {
    "/api/events/{id}": {
        delete: {
            tags: ["Events"],
            summary: "Supprime un événement",
            parameters: [
                { name: "id", in: "path", required: true, schema: { type: "string" } }
            ],
            responses: {
                "200": { description: "Événement supprimé" },
                "404": { description: "Événement non trouvé" }
            }
        }
    }
};
