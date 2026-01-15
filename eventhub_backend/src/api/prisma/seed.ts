import {PrismaClient} from "@prisma/client";
import "dotenv/config";
import {Pool} from "pg";
import { PrismaPg } from "@prisma/adapter-pg"
import { v4 as uuidv4 } from 'uuid';


const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

const prisma = new PrismaClient({
    adapter: new PrismaPg(pool)
});

const events = [
        {
            "title": "Titre de l'event",
            "description": "Event de test",
            "date": new Date(Date.now() + 86400000),
            "venue": "10 Rue de la Roquette",
            "category": "Api",
            "price": 50
        }
]

const main = async () => {
    for (const event of events) {
        await prisma.event.create({ 
            data: {...event, id: uuidv4()}
        });
    }
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });