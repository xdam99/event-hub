import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { EventsModel } from '../model/events.model';

interface EventsState {
    events: EventsModel.Event[];
    isLoading: boolean;
    error: string | null;
    nextCursor?: string;
    limit: number;
}

const initialState: EventsState = {
    events: [],
    isLoading: false,
    error: null,
    nextCursor: undefined,
    limit: 6,
};

export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        fetchEventsLoading: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchEventsSuccess: (state, action) => {
            state.isLoading = false;
            state.events = action.payload;
        },
        fetchEventsError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        fetchPaginatedEventsLoading: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchPaginatedEventsSuccess: (state, action: PayloadAction<{events: EventsModel.Event[], nextCursor?: string, isFirstPage: boolean}>) => {
            state.isLoading = false;
            state.error = null;
            state.nextCursor = action.payload.nextCursor;

            if (action.payload.isFirstPage) {
                // Premier chargement : on remplace
                state.events = action.payload.events;
            } else {
                // Clic sur "Charger plus" : on ajoute à la suite !
                state.events = [...state.events, ...action.payload.events];
            }
        },
        fetchPaginatedEventsError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { 
    fetchEventsLoading,
    fetchEventsSuccess,
    fetchEventsError,
    fetchPaginatedEventsLoading,
    fetchPaginatedEventsSuccess,
    fetchPaginatedEventsError,
} = eventsSlice.actions;
export default eventsSlice.reducer;