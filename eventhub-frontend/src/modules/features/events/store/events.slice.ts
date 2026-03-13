import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { EventsModel } from '../model/events.model';

interface EventsState {
    events: EventsModel.Event[];
    isLoading: boolean;
    error: string | null;
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
}

const initialState: EventsState = {
    events: [],
    isLoading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
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
        fetchPaginatedEventsSuccess: (state, action: PayloadAction<EventsModel.PaginatedEvents>) => {
            state.isLoading = false;
            state.events = action.payload.data;
            state.currentPage = action.payload.page;
            state.totalPages = action.payload.totalPages;
            state.totalCount = action.payload.total;
        },
        fetchPaginatedEventsError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
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
    setPage,    
} = eventsSlice.actions;
export default eventsSlice.reducer;