export interface Event {
  id: number;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  start_time?: string | null;
  end_time?: string | null;
  venue_id: number;
  category_id: number;
  organizer_id: number;
  image_url: string | null;
  color: string | null;
  venue_name?: string;
  category_name?: string;
  organizer_name?: string;
}

export type UserRole = "participant" | "organizer" | "admin";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginResponse {
  token: string;
  user: User;
}
