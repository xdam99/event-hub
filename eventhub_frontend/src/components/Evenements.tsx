import React, { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { getEvents } from "../api/api";
import type { Event } from "../api/types";

import { ReadMoreText } from "./ReadMoreText";

import "./Evenements.scss";

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

const formatDateFR = (d?: string | null) => {
  if (!d) return "";
  const iso = d.slice(0, 10);
  const [y, m, day] = iso.split("-");
  return `${day}/${m}/${y}`;
};

const formatTimeHM = (t?: string | null) => {
  if (!t) return "";
  return t.slice(0, 5);
};

  return (
    <section className="events pt-10 pb-10">
      <h2 className="events-title mb-10">Les événements actuels</h2>
      <div className="events-list m-auto">
        {Array.isArray(events) && events.map(e => {

          const startDateStr = formatDateFR(e.start_date);
          const endDateStr = formatDateFR(e.end_date);

          const startTimeStr = formatTimeHM(e.start_time);
          const endTimeStr = formatTimeHM(e.end_time);

          const sameDay = normalizeDate(e.start_date) === normalizeDate(e.end_date);



          return (
            <div 
              className="events-card pb-10" 
              key={e.id}
              style={{
                boxShadow: e.color ? `0 10px 10px ${e.color}50` : "rgba(0, 0, 0, 0.2)"
              }}
            >
              <div className="events-card-image">
                <img 
                  src={
                    e.image_url
                    ? `http://localhost:5000/uploads/${e.image_url}`
                    : "http://localhost:5000/uploads/no-image.svg"
                  } 
                  alt={e.title} 
                />
              </div>
              <div className="event-card-content">
                <h3 className="event-card-title">{e.title}</h3>
                <ReadMoreText
                  text={e.description ?? ""}
                  maxChars={100}
                  className="event-card-description"
                />
                <div className="event-card-date" style={{
                  backgroundColor: e.color ? `${e.color}` : "transparent"
                }}>
                  {
                    sameDay ? (
                      <span className="event-card-date-same-day">

                        {startDateStr} de {startTimeStr && ` ${startTimeStr}`} à {endTimeStr && ` ${endTimeStr}`}
                      </span>
                    ) : (
                      <>
                        <span className="event-card-date-different-days">
                          {startDateStr}
                          {startTimeStr && ` ${startTimeStr}`}
                        </span>
                        <span className="event-card-date-different-days">
                          {endDateStr}
                          {endTimeStr && ` ${endTimeStr}`}
                        </span>
                      </>
                    )
                  }
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  );
};
