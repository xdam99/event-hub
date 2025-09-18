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

phpinfo();