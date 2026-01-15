import {PrismaClient} from "@prisma/client";
import "dotenv/config";
import {Pool} from "pg";
import { PrismaPg } from "@prisma/adapter-pg"
import { v4 as uuidv4 } from 'uuid';
import { generateSalt, hashPassword } from "../utility";


const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

const prisma = new PrismaClient({
    adapter: new PrismaPg(pool)
});

const users = [
    {
        "firstName": "Damien",
        "lastName": "J",
        "phone": "0123456789",
        "email": "B4bKx@example.com",
        "role": "admin",
        "password": "qwerty",
    }
]

const events = [
        {
            "title": "Titre de l'event",
            "description": "Event de test",
            "date": new Date(Date.now() + 86400000),
            "venue": "10 Rue de la Roquette",
            "category": "Api",
            "capacity": 100,
            "organizer": "Damien J",
            "price": 50
        }
]

const main = async () => {
    for (let i = 0; i < users.length; i++) {
        
        const salt = await generateSalt()
        const hashedPassword = await hashPassword(users[i].password, salt)

        await prisma.user.create({ 
            data: {
                ...users[i],
                salt: salt,
                password: hashedPassword
            }
        });
    }
    for (const event of events) {
            const id = uuidv4()
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