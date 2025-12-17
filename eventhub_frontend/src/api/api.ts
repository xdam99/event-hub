import type { Event } from "./types";
import type { LoginResponse } from "./types";

const API_URL = "http://localhost:5000";

export async function getEvents() {
  const res = await fetch("http://localhost:5000/events");
  if (!res.ok) throw new Error("Erreur chargement events");
  return res.json();
}


export async function getEvent(id: number): Promise<Event> {
  return fetch(`${API_URL}/events/${id}`).then(r => r.json());
}

export async function createEvent(event: Partial<Event>) {
  const res = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(event),
  });

  if (!res.ok) {
    throw new Error("Erreur création événement");
  }

  return res.json();
}


function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
}


export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Identifiants invalides");
  }

  return res.json();
}
