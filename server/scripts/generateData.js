const fs = require("fs");
const { faker } = require("@faker-js/faker");

// Helpers
const oid = () => faker.database.mongodbObjectId();
const randomInt = (min, max) => faker.number.int({ min, max });

/* -------------------------------------------------------------------------- */
/*                              CONFIGURATION                                 */
/* -------------------------------------------------------------------------- */

const NUM_EVENTS = randomInt(3, 5);
const NUM_LIEUX = randomInt(2, 3);

let utilisateurs = [];
let lieux = [];
let evenements = [];
let tickets = [];
let budgets = [];
let depenses = [];
let gains = [];
let artistes = [];
let programmations = [];
let feedbacks = [];

/* -------------------------------------------------------------------------- */
/*                                    LIEUX                                   */
/* -------------------------------------------------------------------------- */

for (let i = 0; i < NUM_LIEUX; i++) {
  lieux.push({
    _id: oid(),
    nom: faker.company.name() + " Hall",
    adresse: faker.location.streetAddress(),
    ville: faker.location.city(),
    capacite: randomInt(500, 5000)
  });
}

/* -------------------------------------------------------------------------- */
/*                                 ARTISTES                                   */
/* -------------------------------------------------------------------------- */

for (let i = 0; i < 20; i++) {
  artistes.push({
    _id: oid(),
    nom: faker.person.fullName(),
    genreMusical: faker.music.genre()
  });
}

/* -------------------------------------------------------------------------- */
/*                               EVENEMENTS                                   */
/* -------------------------------------------------------------------------- */

for (let i = 0; i < NUM_EVENTS; i++) {
  
  const id = oid();
  const lieu = faker.helpers.arrayElement(lieux);

  const event = {
    _id: id,
    nom: faker.company.catchPhrase(),
    description: faker.lorem.paragraph(),
    date: faker.date.soon().toISOString().split("T")[0],
    heure: faker.date.soon().toISOString().split("T")[1].slice(0, 8),
    capacite: randomInt(300, 3000),
    idLieu: lieu._id
  };

  evenements.push(event);

  /* -------------------------- PARTICIPANTS -------------------------------- */

  const participantsCount = randomInt(25, 100);
  let eventParticipants = [];

  for (let p = 0; p < participantsCount; p++) {
    const user = {
      _id: oid(),
      nom: faker.person.fullName(),
      email: faker.internet.email(),
      motDePasse: faker.internet.password(),
      role: "participant"
    };
    utilisateurs.push(user);
    eventParticipants.push(user);
  }

  /* ----------------------------- TICKETS ---------------------------------- */

  eventParticipants.forEach((user) => {
    tickets.push({
      _id: oid(),
      qrCode: faker.string.alphanumeric(12),
      idEvenement: id,
      idUtilisateur: user._id
    });
  });

  /* ------------------------------- BUDGET --------------------------------- */

  const idBudget = oid();

  budgets.push({
    _id: idBudget,
    idEvenement: id,
    montantTotal: faker.number.float({ min: 10000, max: 150000, precision: 0.01 }),
    depensesTotal: 0,
    gainsTotal: 0
  });

  /* ------------------------------- DEPENSES ------------------------------- */

  const depCount = randomInt(3, 8);
  let totalDep = 0;

  for (let d = 0; d < depCount; d++) {
    const montant = faker.number.float({ min: 500, max: 20000, precision: 0.01 });
    depenses.push({
      _id: oid(),
      idBudget: idBudget,
      type: faker.commerce.department(), // FIXED
      montant
    });
    totalDep += montant;
  }

  /* -------------------------------- GAINS --------------------------------- */

  const gainCount = randomInt(2, 5);
  let totalGain = 0;

  for (let g = 0; g < gainCount; g++) {
    const montant = faker.number.float({ min: 5000, max: 50000, precision: 0.01 });
    gains.push({
      _id: oid(),
      idBudget: idBudget,
      source: faker.company.name(),
      montant
    });
    totalGain += montant;
  }

  budgets.find(b => b._id === idBudget).depensesTotal = totalDep;
  budgets.find(b => b._id === idBudget).gainsTotal = totalGain;

  /* ------------------------------- PROGRAMMATION --------------------------- */

  const nbArtistes = randomInt(2, 5);
  faker.helpers.shuffle(artistes).slice(0, nbArtistes).forEach(a => {
    programmations.push({
      _id: oid(),
      idEvenement: id,
      idArtiste: a._id
    });
  });

  /* ------------------------------- FEEDBACKS ------------------------------- */

  const feedbackRate = faker.number.float({ min: 0.25, max: 1 });
  const nbFeedbacks = Math.floor(eventParticipants.length * feedbackRate);

  faker.helpers.shuffle(eventParticipants).slice(0, nbFeedbacks).forEach(u => {
    feedbacks.push({
      _id: oid(),
      idEvenement: id,
      idUtilisateur: u._id,
      note: randomInt(1, 5),
      commentaire: faker.lorem.sentence(),
      dateFeedback: faker.date.soon().toISOString().split("T")[0]
    });
  });

}

/* -------------------------------------------------------------------------- */
/*                            WRITE JSON FILES                                */
/* -------------------------------------------------------------------------- */

const write = (name, data) => {
  fs.writeFileSync(`data/${name}.json`, JSON.stringify(data, null, 2));
};

if (!fs.existsSync("data")) fs.mkdirSync("data");

write("utilisateurs", utilisateurs);
write("lieux", lieux);
write("evenements", evenements);
write("tickets", tickets);
write("budgets", budgets);
write("depenses", depenses);
write("gains", gains);
write("artistes", artistes);
write("programmations", programmations);
write("feedbacks", feedbacks);

console.log("✅ Données générées dans /data !");
