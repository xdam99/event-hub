export namespace EventsModel {
    export type Event = {
        id: string;
        title: string;
        description: string;
        startDate: string;
        venueId: string;
        capacity: number;
        price: number;
        organizerId: string;
        categoryId: string;
        imageUrl: string;
    }
    export type PaginatedEvents = {
        data: Event[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }
}
