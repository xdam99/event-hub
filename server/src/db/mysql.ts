import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
});

export default db;

// Requête SQL pour la flemme au cas où je perds la bdd --------------------------------------------------------------------------------------------------------------------------

// CREATE TABLE users (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   name VARCHAR(255) NOT NULL,
//   email VARCHAR(255) UNIQUE NOT NULL,
//   role ENUM('participant','organizer','admin') NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// CREATE TABLE venues (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   name VARCHAR(255) NOT NULL,
//   address VARCHAR(255),
//   capacity INT NOT NULL
// );

// CREATE TABLE categories (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   name VARCHAR(255) NOT NULL
// );

// CREATE TABLE events (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   title VARCHAR(255) NOT NULL,
//   description TEXT,
//   start_date DATETIME NOT NULL,
//   end_date DATETIME NOT NULL,
//   start_time TIME NOT NULL,
//   end_time TIME NOT NULL,
//   image_url VARCHAR(255),
//   color VARCHAR(255),
//   venue_id INT NOT NULL,
//   category_id INT NOT NULL,
//   organizer_id INT NOT NULL,
//   FOREIGN KEY (venue_id) REFERENCES venues(id),
//   FOREIGN KEY (category_id) REFERENCES categories(id),
//   FOREIGN KEY (organizer_id) REFERENCES users(id)
// );

// CREATE TABLE tickets (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   event_id INT NOT NULL,
//   type VARCHAR(255) NOT NULL,
//   price DECIMAL(10,2) NOT NULL,
//   FOREIGN KEY (event_id) REFERENCES events(id)
// );

// CREATE TABLE bookings (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   ticket_id INT NOT NULL,
//   user_id INT NOT NULL,
//   quantity INT NOT NULL,
//   booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   FOREIGN KEY (ticket_id) REFERENCES tickets(id),
//   FOREIGN KEY (user_id) REFERENCES users(id)
// );

// CREATE TABLE reviews (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   event_id INT NOT NULL,
//   user_id INT NOT NULL,
//   rating INT NOT NULL,
//   comment TEXT,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   FOREIGN KEY (event_id) REFERENCES events(id),
//   FOREIGN KEY (user_id) REFERENCES users(id)
// );

// FAIRE EN 2 FOIS -------------------------------------------------------------------------------------------------------------------------------


// INSERT INTO events
// (
//   title,
//   description,
//   start_date,
//   end_date,
//   start_time,
//   end_time,
//   venue_id,
//   category_id,
//   organizer_id,
//   image_url,
//   color
// )
// VALUES

// (
//   'Festival Électro Lumière',
//   'Une immersion nocturne au cœur de la musique électronique avec des DJs internationaux, une scénographie lumineuse spectaculaire et une ambiance immersive pensée pour vibrer ensemble jusqu’au bout de la nuit.',
//   '2025-03-15',
//   '2025-03-15',
//   '20:00',
//   '02:00',
//   1,
//   1,
//   1,
//   'telechargement.jpg',
//   '#7C3AED'
// ),

// (
//   'Conférence Web & Innovation',
//   'Une journée dédiée aux professionnels du web pour explorer les nouvelles pratiques, les enjeux technologiques actuels et les innovations numériques à travers des conférences et échanges concrets.',
//   '2025-04-10',
//   '2025-04-10',
//   '09:00',
//   '18:00',
//   2,
//   2,
//   2,
//   'telechargement_1.jpg',
//   '#2563EB'
// ),

// (
//   'Exposition Art Contemporain',
//   'Une exposition rassemblant des artistes contemporains aux univers variés. Peintures, sculptures et œuvres numériques dialoguent dans un parcours visuel et émotionnel accessible à tous.',
//   '2025-05-01',
//   '2025-05-30',
//   '10:00',
//   '19:00',
//   3,
//   3,
//   3,
//   'telechargement_2.jpg',
//   '#16A34A'
// ),

// (
//   'Jazz & Soul Night',
//   'Une soirée musicale intimiste mêlant jazz et soul dans une atmosphère chaleureuse. Des musiciens talentueux revisitent les classiques et proposent des compositionsP;compositions originales en live.',
//   '2025-06-20',
//   '2025-06-20',
//   '19:00',
//   '23:30',
//   4,
//   1,
//   1,
//   'telechargement_3.jpg',
//   '#F59E0B'
// ),

// (
//   'Workshop Node.js Avancé',
//   'Un atelier intensif destiné aux développeurs souhaitant approfondir Node.js. Architecture, performance et bonnes pratiques sont abordées à travers des exercices concrets et applicables.',
//   '2025-07-05',
//   '2025-07-05',
//   '10:00',
//   '16:00',
//   2,
//   2,
//   2,
//   'telechargement_4.jpg',
//   '#DC2626'
// ),

// (
//   'Salon du Livre Indépendant',
//   'Un événement dédié aux auteurs et éditeurs indépendants. Rencontres, dédicaces et conférences rythment la journée pour promouvoir la diversité littéraire et la découverte de nouvelles voix.',
//   '2025-08-12',
//   '2025-08-12',
//   '09:00',
//   '18:00',
//   5,
//   3,
//   3,
//   'telechargement_5.jpg',
//   '#0EA5E9'
// ),

// (
//   'Rencontre Startups & Investisseurs',
//   'Une rencontre professionnelle favorisant les échanges entre startups innovantes et investisseurs. Pitchs, networking et discussions stratégiques pour créer de nouvelles opportunités.',
//   '2025-09-18',
//   '2025-09-18',
//   '14:00',
//   '20:00',
//   2,
//   2,
//   2,
//   'telechargement_6.jpg',
//   '#9333EA'
// ),

// (
//   'Cinéma Plein Air',
//   'Une projection en plein air dans une ambiance conviviale. Le public profite d’un film sélectionné avec soin, accompagné d’animations et de restauration pour une soirée culturelle accessible.',
//   '2025-07-25',
//   '2025-07-25',
//   '21:00',
//   '23:30',
//   1,
//   3,
//   1,
//   'telechargement_7.jpg',
//   '#22C55E'
// );
