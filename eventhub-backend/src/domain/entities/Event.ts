export interface EventProps {
    id: string;
    title: string;
    description?: string;
    startDate: Date;
    venueId: string;
    capacity: number;
    price?: number;
    organizerId: string;
    categoryId: string;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

export class Event {

    constructor(public readonly props: EventProps) {
        this.validate();
    }

    get id() { return this.props.id; }
    get title() { return this.props.title; }
    get description() { return this.props.description; }
    get startDate() { return this.props.startDate; }
    get venueId() { return this.props.venueId; }
    get capacity() { return this.props.capacity; }
    get price() { return this.props.price; }
    get organizerId() { return this.props.organizerId; }
    get categoryId() { return this.props.categoryId; }
    get imageUrl() { return this.props.imageUrl; }
    get createdAt() { return this.props.createdAt; }
    get updatedAt() { return this.props.updatedAt; }

    private validate() {
        if (!this.props.title) {
            throw new Error('Le titre est requis');
        }
        if (this.props.capacity < 1) {
            throw new Error('La capacité doit être au moins de 1');
        }
        if (this.props.price !== undefined && this.props.price < 0) {
            throw new Error('Le prix ne peut pas être négatif');
        }
        if (!this.props.id) {
            throw new Error('L\'ID est requis');
        }
        if (this.props.description !== undefined && this.props.description.length > 1500) {
            throw new Error('La description ne peut pas dépasser 1500 caractères');
        }
    }
}
