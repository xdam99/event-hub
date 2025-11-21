import React, { useEffect, useState } from "react";
import { Evenement, getEvenements } from "../services/api";
import './Evenements.css';

const Evenements: React.FC = () => {
  const [evenements, setEvenements] = useState<Evenement[]>([]);

  useEffect(() => {
    getEvenements().then(setEvenements).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Liste des événements</h2>
      <div className="events-container">
        {evenements.map(e => (
          <div key={e._id} className="event-card">
            <h3>{e.nom}</h3>
            <p><strong>Lieu :</strong> {e.lieu?.nom || "Inconnu"} ({e.lieu?.ville || "Ville inconnue"})</p>
            <p><strong>Date :</strong> {new Date(e.date).toLocaleDateString()} à {new Date(e.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <p><strong>Capacité :</strong> {e.capacite || "Non précisée"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Evenements;
