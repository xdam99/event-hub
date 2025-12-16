import type { Event } from "./types";

export async function getEvents(): Promise<Event[]> {
  return fetch("http://localhost:5000/events").then(r => r.json());
}

export async function getEvent(id: number): Promise<Event> {
  return fetch(`http://localhost:5000/events/${id}`).then(r => r.json());
}

export async function createEvent(event: Partial<Event>) {
  return fetch("http://localhost:5000/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
}