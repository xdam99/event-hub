export interface EventProps {
    title: string;
    description: string;
    date: Date;
    createdAt?: Date;
    updatedAt?: Date;
    venue: string;
    category: string;
    price: number;
}
export class Event {
    private props: EventProps;

    get title(): string {
        return this.props.title;
    }

    get description(): string {
        return this.props.description;
    }

    get date(): Date {
        return this.props.date;
    }

    
    get venue(): string {
        return this.props.venue;
    }
    
    get category(): string {
        return this.props.category;
    }
    
    get price(): number {
        return this.props.price;
    }
    constructor(props: EventProps) {
        this.validate(props);
        this.props = {
            ...props,
            createdAt: props.createdAt || new Date(),
            updatedAt: props.updatedAt || new Date()
        };
    }
    private validate(props: EventProps): void {
        // Exemple mais il faut le faire sur toutes les autres règles métier
        if (!props.title || props.title.trim() === '') {
            throw new Error('Le titre est obligatoire');
        }
        if (!props.description || props.description.trim() === '') {
            throw new Error('La description est obligatoire');
        }
        if (!props.date) {
            throw new Error('La date est obligatoire');
        }
        if (props.date.getTime() < Date.now()) {
            throw new Error('La date doit être dans le futur');
        }
        if (!props.venue || props.venue.trim() === '') {
            throw new Error('Le lieu est obligatoire');
        }
        if (!props.category || props.category.trim() === '') {
            throw new Error('La catégories est obligatoire');
        }
        if (!props.price) {
            throw new Error('Le prix est obligatoire');
        }
    }
}