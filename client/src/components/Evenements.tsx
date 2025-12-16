import React, { useEffect, useState } from "react";
import { getEvents } from "../api/api";
import { Event } from "../api/types";
import "./Evenements.css";

export const EvenementsList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        setError("Impossible de charger les événements");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      <h2>Événements</h2>
      <div className="event-list">
        {events.map(e => (
          <div className="event-card" key={e.id}>
            <div className="event-card-image">
              <img 
                src={e.image_url ? `http://localhost:5000/uploads/${e.image_url}` : "http://localhost:5000/uploads/no-image.svg"} 
                alt={e.title} 
              />
            </div>
            <div className="event-card-content">
              <h3 className="event-card-title">{e.title}</h3>
              <p className="event-card-description">{e.description}</p>
              <p className="event-card-date">
                {new Date(e.start_date).toLocaleString()} -{" "}
                {new Date(e.end_date).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
