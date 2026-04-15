import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { AppState } from '../../../store/store';
import { useAppDispatch } from '../../../store/store';
import { fetchPaginatedEventsAction } from '../actions/fetch-events.action';

export const useEvents = () => {
    const dispatch = useAppDispatch();
    const { events, isLoading, error, nextCursor, limit } = useSelector(
        (state: AppState) => state.events
    );

    // 1. Chargement initial automatique (quand on arrive sur la page)
    useEffect(() => {
        if (events.length === 0) {
            dispatch(fetchPaginatedEventsAction(undefined, limit));
        }
    }, [dispatch, limit, events.length]); 

    // 2. La fameuse fonction loadMore qu'on crée avec useCallback
    const loadMore = useCallback(() => {
        if (nextCursor && !isLoading) {
            dispatch(fetchPaginatedEventsAction(nextCursor, limit));
        }
    }, [dispatch, nextCursor, limit, isLoading]);

    // 3. L'export crucial : on renvoie toutes les données ET la fonction
    return {
        events,
        isLoading,
        error,
        nextCursor,
        limit,
        loadMore // 👈 C'est CETTE ligne qui va faire disparaître ton erreur rouge !
    };
};