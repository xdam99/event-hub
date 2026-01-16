export interface EventProps {
    id?: string;
    title: string;
    description: string;
    date: Date;
    capacity: number;
    price: number;
    organizer: string;
    venue: string;
    category: string;
    imageUrl?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}


export class Event {
    private props: EventProps;

    constructor(props: EventProps) {
        this.validate(props);
        this.props = {
            id: props.id || crypto.randomUUID(),
            title: props.title,
            description: props.description,
            date: props.date,
            capacity: props.capacity,
            price: props.price,
            organizer: props.organizer,
            venue: props.venue,
            category: props.category,
            imageUrl: props.imageUrl || [],
            createdAt: props.createdAt || new Date(),
            updatedAt: props.updatedAt || new Date(),
        };
    }

    private validate(props: EventProps) {
        if (!props.title) throw new Error("Le titre est obligatoire");
        if (!props.description) throw new Error("La description est obligatoire");
        if (!props.date) throw new Error("La date est obligatoire");
        if (!props.capacity) throw new Error("La capacité est obligatoire");
        if (!props.price) throw new Error("Le prix est obligatoire");
        if (!props.organizer) throw new Error("L'organisateur est obligatoire");
        if (!props.venue) throw new Error("Le lieu est obligatoire");
        if (!props.category) throw new Error("La catégorie est obligatoire");
        if (this.props.capacity <= 0) throw new Error("La capacité doit être positive");
        if (this.props.date <= new Date()) throw new Error("La date doit être dans le futur");
    }

    get id() { return this.props.id; }
    get title() { return this.props.title; }
    get description() { return this.props.description; }
    get date() { return this.props.date; }
    get capacity() { return this.props.capacity; }
    get price() { return this.props.price; }
    get organizer() { return this.props.organizer; }
    get venue() { return this.props.venue; }
    get category() { return this.props.category; }
    get imageUrl() { return this.props.imageUrl; }
    get createdAt() { return this.props.createdAt; }
    get updatedAt() { return this.props.updatedAt; }
}
