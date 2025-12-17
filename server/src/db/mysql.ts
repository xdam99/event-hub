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


// START TRANSACTION;

// INSERT INTO venues (name, address, capacity) VALUES
// ('Zénith Paris', '8 Boulevard de la Villette, Paris', 5000),
// ('Palais des Congrès', '2 Place de la Porte Maillot, Paris', 1000),
// ('La Sucrière', '49-50 Quai Rambaud, Lyon', 300),
// ('Théâtre du Châtelet', '1 Place du Châtelet, Paris', 2000),
// ('Centre Pompidou', 'Place Georges-Pompidou, Paris', 800);

// INSERT INTO categories (name) VALUES
// ('Musique'),
// ('Technologie'),
// ('Art');

// INSERT INTO users (name, email, role) VALUES
// ('Bob', 'bob@example.com', 'organizer'),
// ('Claire', 'claire@example.com', 'organizer'),
// ('Alice', 'alice@example.com', 'organizer');

// INSERT INTO events (title, description, start_date, end_date, start_time, end_time, image_url, color, venue_id, category_id, organizer_id)
// VALUES
// ('Concert Electro Night', 'Une nuit électro avec des DJs internationaux', '2025-03-15 20:00:00', '2025-03-16 02:00:00', '20:00:00', '02:00:00', 'telechargement.jpg', '#FF0000',  1, 1, 1),
// ('Conférence React & TypeScript', 'Les meilleures pratiques React TS en 2025', '2025-04-10', '2025-04-10', '10:00:00', '12:00:00', 'telechargement_1.jpg', '#00FF00', 2, 2, 2),
// ('Exposition Art Moderne', 'Artistes contemporains européens', '2025-05-01', '2025-05-30', '10:00:00', '18:00:00', 'telechargement_2.jpg', '#0000FF', 3, 3, 3),
// ('Festival Jazz', 'Jazz en live avec des musiciens internationaux', '2025-06-20', '2025-06-21', '20:00:00', '02:00:00', 'telechargement_3.jpg', '#FFFF00', 4, 1, 1),
// ('Workshop Node.js', 'Atelier pratique Node.js et backend', '2025-07-05', '2025-07-05', '10:00:00', '12:00:00', 'telechargement_4.jpg', '#FF00FF', 2, 2, 2),
// ('Salon du Livre', 'Rencontre avec des auteurs et conférences', '2025-08-12', '2025-08-12', '14:00:00', '16:00:00', 'telechargement_5.jpg', '#00FFFF', 5, 3, 3);

// COMMIT;
