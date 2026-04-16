import "dotenv/config";
import { randomUUID } from "crypto";
import { prisma } from "./db";

// 1. Définition des données de base pour la génération aléatoire
const eventTypes = ["Soirée", "Exposition", "Afterwork", "Conférence", "Atelier", "Concert", "Masterclass", "Festival", "Meetup"];
const themes = ["Jazz", "IA & Tech", "Pâtisserie", "Électro", "Art Contemporain", "Photographie", "Entrepreneuriat", "Yoga", "Cinéma", "Oenologie"];
const venues = ["venue_paris_1", "venue_paris_atrium", "venue_rooftop_12", "venue_studio_tech", "venue_atelier_gourmet", "venue_warehouse_09"];
const organizers = ["org_jazzlive_001", "org_culturexp_003", "org_nightlife_007", "org_techconf_015", "org_gourmet_022", "org_techno_018"];
const categories = ["cat_jazz_01", "cat_expo_02", "cat_party_05", "cat_conference_03", "cat_workshop_04", "cat_concert_01"];
const imageUrls = [
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
    "https://images.unsplash.com/photo-1577720111095-90b3c3941ec9?w=800",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    "https://images.unsplash.com/photo-1505373877291-93597ec69e07?w=800",
    undefined // Pour simuler des événements sans image
];

type EventSeedData = {
    title: string;
    description: string;
    startDate: Date;
    venueId: string;
    capacity: number;
    price: number;
    organizerId: string;
    categoryId: string;
    imageUrl?: string; 
};

function generateEvents(count: number) {
    const events: EventSeedData[] = [];
    const now = new Date();

    for (let i = 0; i < count; i++) {
        const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        const theme = themes[Math.floor(Math.random() * themes.length)];
        const venueId = venues[Math.floor(Math.random() * venues.length)];
        const organizerId = organizers[Math.floor(Math.random() * organizers.length)];
        const categoryId = categories[Math.floor(Math.random() * categories.length)];
        const imageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];

        // Générer une date aléatoire entre demain et dans 6 mois
        const startDate = new Date(now);
        startDate.setDate(now.getDate() + Math.floor(Math.random() * 180) + 1);
        startDate.setHours(10 + Math.floor(Math.random() * 12), 0, 0, 0); // Entre 10h et 22h

        events.push({
            title: `${type} : ${theme} (Vol. ${i + 1})`,
            description: `Rejoignez-nous pour cet événement exceptionnel autour de la thématique ${theme}. Une expérience inoubliable garantie pour cette édition numéro ${i + 1}.`,
            startDate,
            venueId,
            capacity: Math.floor(Math.random() * 950) + 50, // Capacité entre 50 et 1000
            price: Math.floor(Math.random() * 80) + 10, // Prix entre 10 et 90 euros
            organizerId,
            categoryId,
            imageUrl,
        });
    }
    return events;
}

// Génération des 100 événements
const eventsData = generateEvents(100);

// 3. Script principal de Seeding
async function main() {
    console.log(`Début du seeding de ${eventsData.length} événements...`);

    let successCount = 0;

    for (const event of eventsData) {
        try {
            await prisma.event.upsert({
                where: {
                    title_startDate: {
                        title: event.title,
                        startDate: event.startDate,
                    },
                },
                update: {},
                create: {
                    id: randomUUID(),
                    title: event.title,
                    description: event.description,
                    startDate: event.startDate,
                    venueId: event.venueId,
                    capacity: event.capacity,
                    price: event.price,
                    organizerId: event.organizerId,
                    categoryId: event.categoryId,
                    imageUrl: event.imageUrl,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });
            successCount++;
        } catch (error) {
            console.error(`Erreur lors de la création de "${event.title}":`, error);
        }
    }

    console.log(`Seeding terminé ! ${successCount}/${eventsData.length} événements créés avec succès.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });