import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { AppState } from '../../../store/store';
import { useAppDispatch } from '../../../store/store';
// 🌟 Correction de l'import (depuis tes actions, pas l'API)
import { fetchEventByIdAction } from '../actions/fetch-event-by-id.action'; 

export const useEventById = (id: string | undefined) => {
    const dispatch = useAppDispatch();
    
    // 🌟 On pointe sur "state.events" au lieu de "state.eventDetails"
    const { currentEvent, isLoading, error } = useSelector(
        (state: AppState) => state.events 
    );

    useEffect(() => {
        if (id) {
            dispatch(fetchEventByIdAction(id));
        }
    }, [dispatch, id]);

    return { event: currentEvent, isLoading, error }; // On retourne l'événement
};