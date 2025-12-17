export class Event {
    constructor(
        public id: number | null,
        public title: string,
        public description: string | null,
        public start_date: string,
        public end_date: string,
        public start_time: string,
        public end_time: string,
        public venue_id: number,
        public category_id: number,
        public organizer_id: number,
        public image_url: string | null,
        public color: string,
        public venue_name?: string,
        public category_name?: string,
        public organizer_name?: string
    ) {}
}

