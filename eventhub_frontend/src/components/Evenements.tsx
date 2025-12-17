import React, { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { getEvents } from "../api/api";
import type { Event } from "../api/types";
import "./Evenements.css";

export const EvenementsList: React.FC = () => {
  const { token } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await getEvents(); // GET public
        setEvents(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) return <p>Chargement...</p>;

  if (events.length === 0) return <p>Aucun événement</p>;

  const normalizeDate = (d?: string | null) => (d ? d.slice(0, 10) : "");
  const normalizeTime = (t?: string | null) => {
    if (!t) return "00:00:00";
    return t.length === 5 ? `${t}:00` : t;
  };

  return (
    <section className="events">
      <h2 className="events-title">Les événements actuels</h2>
      <div className="event-list">
        {Array.isArray(events) && events.map(e => {
          const gradientColor = e.color
            ? e.color
            : "#FFFFFF30";

          const startIso = `${normalizeDate(e.start_date)}T${normalizeTime(e.start_time)}`;
          const endIso = `${normalizeDate(e.end_date)}T${normalizeTime(e.end_time)}`;

          const start = new Date(startIso);
          const end = new Date(endIso);

          return (
            <div 
              className="event-card" 
              key={e.id}
              style={{
                backgroundImage: `linear-gradient(to bottom, #00000050 0%, ${gradientColor}AA 100%), url(${e.image_url ? `http://localhost:5000/uploads/${e.image_url}` : "http://localhost:5000/uploads/no-image.svg"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}
            >
              <div className="event-card-content">
                <h3 className="event-card-title">{e.title}</h3>
                <p className="event-card-description">{e.description}</p>
                <p className="event-card-date">
                  {start.toLocaleDateString("fr-FR")} - {end.toLocaleDateString("fr-FR")}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  );
};
