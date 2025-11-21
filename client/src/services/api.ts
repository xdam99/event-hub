export interface Lieu {
  _id: string;
  nom: string;
  ville: string;
}

export interface Evenement {
  _id: string;
  nom: string;
  date: string;
  idLieu: string;
  lieu?: Lieu;
}

export async function getEvenements(): Promise<Evenement[]> {
  const res = await fetch("http://localhost:5000/evenements");
  if (!res.ok) throw new Error("Erreur lors de la récupération des événements");
  const data: Evenement[] = await res.json();
  return data;
}