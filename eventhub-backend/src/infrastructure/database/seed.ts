// import "dotenv/config";
// import { randomUUID } from "crypto";
// import { prisma } from "./db";

// const eventsData = [
//     {
//         title: "Soirée Jazz au Caveau de la Huchette",
//         description:
//             "Une soirée exceptionnelle avec le trio de Benjamin Moussay et des invités surprises. Ambiance mythique du club le plus ancien de Paris.",
//         startDate: new Date("2026-02-14T21:00:00+01:00"),
//         venueId: "venue_paris_1",
//         capacity: 120,
//         price: 28,
//         organizerId: "org_jazzlive_001",
//         categoryId: "cat_jazz_01",
//         imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
//     },
//     {
//         title: "Exposition immersive Van Gogh",
//         description:
//             "Plongez au cœur des œuvres de Van Gogh grâce à une projection 360° monumentale et une bande-son originale.",
//         startDate: new Date("2026-03-05T18:30:00+01:00"),
//         venueId: "venue_paris_atrium",
//         capacity: 450,
//         price: 32,
//         organizerId: "org_culturexp_003",
//         categoryId: "cat_expo_02",
//         imageUrl: "https://images.unsplash.com/photo-1577720111095-90b3c3941ec9?w=800",
//     },
//     {
//         title: "Afterwork DJ Set – Rooftop Panorama",
//         description:
//             "DJ set electro-house avec vue imprenable sur Paris. Open bar inclus pour les 100 premières places réservées.",
//         startDate: new Date("2026-02-20T19:00:00+01:00"),
//         venueId: "venue_rooftop_12",
//         capacity: 180,
//         price: 18,
//         organizerId: "org_nightlife_007",
//         categoryId: "cat_party_05",
//         // imageUrl optionnel
//     },
//     {
//         title: "Conférence IA & Créativité 2026",
//         description:
//             "Les plus grands noms de l'IA générative et du design discutent de l'avenir de la création à l'ère des modèles multimodaux.",
//         startDate: new Date("2026-04-10T09:00:00+02:00"),
//         venueId: "venue_studio_tech",
//         capacity: 320,
//         price: 85,
//         organizerId: "org_techconf_015",
//         categoryId: "cat_conference_03",
//         imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
//     },
//     {
//         title: "Atelier Pâtisserie avec Pierre Hermé",
//         description:
//             "Masterclass exclusive : réalisation du célèbre Ispahan et de la nouvelle création printemps 2026.",
//         startDate: new Date("2026-03-28T14:30:00+01:00"),
//         venueId: "venue_atelier_gourmet",
//         capacity: 16,
//         price: 190,
//         organizerId: "org_gourmet_022",
//         categoryId: "cat_workshop_04",
//     },
//     {
//         title: "Concert électro – Tale of Us",
//         description: "Retour très attendu du duo italien dans une configuration live inédite.",
//         startDate: new Date("2026-05-02T23:00:00+02:00"),
//         venueId: "venue_warehouse_09",
//         capacity: 850,
//         price: 45,
//         organizerId: "org_techno_018",
//         categoryId: "cat_concert_01",
//         imageUrl: "https://images.unsplash.com/photo-1505373877291-93597ec69e07?w=800",
//     },
// ];

// async function main() {
//     console.log("Début du seeding des événements...");

//     for (const event of eventsData) {
//         try {
//             const createdEvent = await prisma.event.upsert({
//                 where: {
//                     title_startDate: {
//                         title: event.title,
//                         startDate: event.startDate,
//                     },
//                 },
//                 update: {},
//                 create: {
//                     id: randomUUID(),
//                     title: event.title,
//                     description: event.description,
//                     startDate: event.startDate,
//                     venueId: event.venueId,
//                     capacity: event.capacity,
//                     price: event.price,
//                     organizerId: event.organizerId,
//                     categoryId: event.categoryId,
//                     imageUrl: event.imageUrl,
//                     createdAt: new Date(),
//                     updatedAt: new Date(),
//                 },
//             });

//             console.log(`Événement créé ou déjà existant : ${createdEvent.title}`);
//         } catch (error) {
//             console.error(`Erreur lors de la création de "${event.title}":`, error);
//         }
//     }

//     console.log("Seeding terminé !");
// }

// main()
//     .catch((e) => {
//         console.error(e);
//         process.exit(1);
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });

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