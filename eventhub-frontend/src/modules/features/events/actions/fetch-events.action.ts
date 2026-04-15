import type { Dependencies } from "../../../store/dependencies";
import type { AppDispatch, AppGetState } from "../../../store/store";
import { eventsSlice } from "../store/events.slice";

export const fetchEventsAction = () => async (
    dispatch: AppDispatch,
    _: AppGetState,
    dependencies: Dependencies
) => {
    try {
        dispatch(eventsSlice.actions.fetchEventsLoading());
        const result = await dependencies.eventGateway.findAll();
        dispatch(eventsSlice.actions.fetchEventsSuccess(result));
    } catch (error) {
        let message = "Une erreur est survenue";
        if (error instanceof Error) {
            message = error.message;
        }
        dispatch(eventsSlice.actions.fetchEventsError(message));
    }
}

export const fetchPaginatedEventsAction = (cursor: string | undefined, limit: number = 6) => async (
    dispatch: AppDispatch,
    _getState: AppGetState,
    { eventGateway }: Dependencies
) => {
    dispatch(eventsSlice.actions.fetchPaginatedEventsLoading());
    try {
        const result = await eventGateway.findPaginated(cursor, limit);
        dispatch(eventsSlice.actions.fetchPaginatedEventsSuccess({
            events: result.events,
            nextCursor: result.nextCursor,
            isFirstPage: !cursor
        }));
    } catch (error: any) {
        const errorMessage = error.response?.data?.error?.message || error.message || "Erreur lors du chargement des évènements";
        dispatch(eventsSlice.actions.fetchPaginatedEventsError(errorMessage));
    }
};