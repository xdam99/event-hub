import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { EventsModel } from '../model/events.model';
// 🌟 Ajout de l'import de ton action
import { fetchEventByIdAction } from '../actions/fetch-event-by-id.action'; 

interface EventsState {
    events: EventsModel.Event[];
    currentEvent: EventsModel.Event | null; // 🌟 Ajout de l'événement unique
    isLoading: boolean;
    error: string | null;
    nextCursor?: string;
    limit: number;
}

const initialState: EventsState = {
    events: [],
    currentEvent: null, // 🌟 Initialisation
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
                state.events = action.payload.events;
            } else {
                state.events = [...state.events, ...action.payload.events];
            }
        },
        fetchPaginatedEventsError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
    // 🌟 Ajout des extraReducers pour gérer createAsyncThunk
    extraReducers: (builder) => {
        builder
            .addCase(fetchEventByIdAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.currentEvent = null; // On vide l'ancien événement au chargement
            })
            .addCase(fetchEventByIdAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentEvent = action.payload; // On stocke l'événement récupéré
            })
            .addCase(fetchEventByIdAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string; // On gère l'erreur
            });
    }
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