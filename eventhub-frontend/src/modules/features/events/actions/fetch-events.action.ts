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