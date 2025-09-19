<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "mysql";
$username = "root";
$password = "1234";
$dbname = "db_event-hub";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$table_exists = $conn->query("SHOW TABLES LIKE 'events'");

if ($table_exists === false) {
    die("Erreur lors de la vérification de la table: " . $conn->error);
}

if ($table_exists->num_rows === 0) {
    $sql_remove = "DROP TABLE IF EXISTS events";
    if ($conn->query($sql_remove) === TRUE) {
        echo "✅ Table 'events' supprimée pour le test avec succès.<br>";
    } else {
        die("❌ Erreur lors de la suppression de la table: " . $conn->error);
    }

    $sql_create = "CREATE TABLE events (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        title_events VARCHAR(100) NOT NULL,
        description_events VARCHAR(255) NOT NULL,
        date_events VARCHAR(50) NOT NULL,
        time_events VARCHAR(50) NOT NULL,
        location_events VARCHAR(100) NOT NULL,
        type_events VARCHAR(50) NOT NULL,
        price_events VARCHAR(50) NOT NULL,
        image_events VARCHAR(255),
        link_events VARCHAR(255),
        status_events VARCHAR(50),
        category_events VARCHAR(50)
    )";

    if ($conn->query($sql_create) === TRUE) {
        echo "✅ Table 'events' créée avec succès.<br>";
    } else {
        die("❌ Erreur lors de la création de la table: " . $conn->error);
    }

    $sql_insert = "INSERT INTO events (
        title_events, description_events, date_events, time_events, location_events, type_events, price_events,
        image_events, link_events, status_events, category_events
    ) VALUES
        ('Event 1', 'Description 1', '2023-06-01', '10:00', 'Location 1', 'Type 1', 'Price 1', 'image1.jpg', 'https://example.com/event1', 'Active', 'Category 1'),
        ('Event 2', 'Description 2', '2023-06-02', '11:00', 'Location 2', 'Type 2', 'Price 2', 'image2.jpg', 'https://example.com/event2', 'Active', 'Category 2'),
        ('Event 3', 'Description 3', '2023-06-03', '12:00', 'Location 3', 'Type 3', 'Price 3', 'image3.jpg', 'https://example.com/event3', 'Active', 'Category 3')";

    if ($conn->query($sql_insert) === TRUE) {
        echo "✅ 3 événements insérés avec succès.<br>";
    } else {
        die("❌ Erreur lors de l’insertion des données: " . $conn->error);
    }
}

$conn->close();
?>
