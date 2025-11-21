CREATE TABLE Utilisateur (
    idUtilisateur INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    email VARCHAR(150) UNIQUE,
    motDePasse VARCHAR(255),
    role ENUM('participant','organisateur','administrateur','artiste') NOT NULL
);

CREATE TABLE Lieu (
    idLieu INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    adresse VARCHAR(255),
    ville VARCHAR(100),
    capacite INT
);

CREATE TABLE Evenement (
    idEvenement INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(150),
    description TEXT,
    date DATE,
    heure TIME,
    capacite INT,
    idLieu INT,
    FOREIGN KEY (idLieu) REFERENCES Lieu(idLieu)
);

CREATE TABLE Ticket (
    idTicket INT AUTO_INCREMENT PRIMARY KEY,
    qrCode VARCHAR(255),
    idEvenement INT,
    idUtilisateur INT,
    FOREIGN KEY (idEvenement) REFERENCES Evenement(idEvenement),
    FOREIGN KEY (idUtilisateur) REFERENCES Utilisateur(idUtilisateur)
);

CREATE TABLE Budget (
    idBudget INT AUTO_INCREMENT PRIMARY KEY,
    idEvenement INT UNIQUE,
    montantTotal DECIMAL(10,2),
    depensesTotal DECIMAL(10,2),
    gainsTotal DECIMAL(10,2),
    FOREIGN KEY (idEvenement) REFERENCES Evenement(idEvenement)
);

CREATE TABLE Depense (
    idDepense INT AUTO_INCREMENT PRIMARY KEY,
    idBudget INT,
    type VARCHAR(100),
    montant DECIMAL(10,2),
    FOREIGN KEY (idBudget) REFERENCES Budget(idBudget)
);

CREATE TABLE Gain (
    idGain INT AUTO_INCREMENT PRIMARY KEY,
    idBudget INT,
    source VARCHAR(100),
    montant DECIMAL(10,2),
    FOREIGN KEY (idBudget) REFERENCES Budget(idBudget)
    );

CREATE TABLE Artiste (
    idArtiste INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    genreMusical VARCHAR(100)
);

CREATE TABLE Programmation (
    idEvenement INT,
    idArtiste INT,
    PRIMARY KEY(idEvenement, idArtiste),
    FOREIGN KEY (idEvenement) REFERENCES Evenement(idEvenement),
    FOREIGN KEY (idArtiste) REFERENCES Artiste(idArtiste)
);

CREATE TABLE Feedback (
    idFeedback INT AUTO_INCREMENT PRIMARY KEY,
    idEvenement INT,
    idUtilisateur INT,
    note INT,
    commentaire TEXT,
    dateFeedback DATE,
    FOREIGN KEY (idEvenement) REFERENCES Evenement(idEvenement),
    FOREIGN KEY (idUtilisateur) REFERENCES Utilisateur(idUtilisateur)
);
