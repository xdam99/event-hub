export interface Event {
  id: number;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  venue_id: number;
  category_id: number;
  organizer_id: number;
  image_url: string | null;
  venue_name?: string;
  category_name?: string;
  organizer_name?: string;
}

