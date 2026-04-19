import { createAsyncThunk } from '@reduxjs/toolkit';
import { EventGateway } from '../api/fetch-events.api';

// Tu instancies ton gateway (ou tu l'injectes si tu as un système d'injection de dépendances)
const eventGateway = new EventGateway();

export const fetchEventByIdAction = createAsyncThunk(
    'events/fetchById',
    async (id: string, { rejectWithValue }) => {
        try {
            // 🌟 On appelle ta méthode findById du Gateway !
            const event = await eventGateway.findById(id);
            
            if (!event) {
                return rejectWithValue("Événement introuvable (404)");
            }
            
            return event;
        } catch (error: any) {
            return rejectWithValue(error.message || "Erreur lors de la récupération de l'événement");
        }
    }
);