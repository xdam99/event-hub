export const EventSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        title: { type: "string" },
        description: { type: "string" },
        date: { type: "string", format: "date-time" },
        capacity: { type: "integer" },
        price: { type: "number" },
        organizer: { type: "string" },
        venue: { type: "string" },
        category: { type: "string" },
        imageUrl: { type: "array", items: { type: "string" } },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
    },
};
