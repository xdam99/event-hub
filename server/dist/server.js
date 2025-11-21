import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
const port = 5000;

// Middleware pour JSON
app.use(express.json());

// MongoDB connection
const uri = "mongodb://root:1234@mongo:27017/eventhub?authSource=admin";
const client = new MongoClient(uri);
let db;

async function connectDB() {
  await client.connect();
  db = client.db("eventhub");
  console.log("✅ Connecté à MongoDB !");
}
connectDB().catch(console.error);


app.use(cors({
  origin: "http://localhost:3000"
}));

//////////////////////
// ROUTES REST
//////////////////////

app.get("/", (req, res) => {
  res.send("✅ Serveur OK");
});

app.get("/evenements", async (req, res) => {
  try {
    const evenements = await db.collection("evenements").find().toArray();
    const lieux = await db.collection("lieux").find().toArray();

    const lieuxMap = {};
    lieux.forEach(l => {
      lieuxMap[l._id.toString()] = l;
    });

    evenements.forEach(e => {
      e.lieu = lieuxMap[e.idLieu];
    });

    res.json(evenements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.get("/evenements/:id", async (req, res) => {
  try {
    const evenement = await db
      .collection("evenements")
      .findOne({ _id: new ObjectId(req.params.id) });
    res.json(evenement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/evenements/:id/participants", async (req, res) => {
  try {
    const tickets = await db
      .collection("tickets")
      .find({ idEvenement: req.params.id })
      .toArray();

    const participantIds = tickets.map(t => t.idUtilisateur);
    const participants = await db
      .collection("utilisateurs")
      .find({ _id: { $in: participantIds.map(id => new ObjectId(id)) } })
      .toArray();

    res.json(participants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/evenements/:id/feedbacks", async (req, res) => {
  try {
    const feedbacks = await db
      .collection("feedbacks")
      .find({ idEvenement: req.params.id })
      .toArray();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Serveur REST démarré sur http://localhost:${port}`);
});
