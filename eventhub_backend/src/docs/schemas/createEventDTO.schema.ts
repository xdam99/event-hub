export const CreateEventDTOSchema = {
    type: "object",
    required: ["title","description","date","capacity","price","organizer","venue","category"],
    properties: {
        title: { type: "string" },
        description: { type: "string" },
        date: { type: "string", format: "date-time" },
        capacity: { type: "integer" },
        price: { type: "number" },
        organizer: { type: "string" },
        venue: { type: "string" },
        category: { type: "string" },
        imageUrl: { type: "array", items: { type: "string" } },
    },
};
