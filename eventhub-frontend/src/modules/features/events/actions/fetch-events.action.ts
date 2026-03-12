import type { Dependencies } from "../../../store/dependencies";
import type { AppDispatch, AppGetState } from "../../../store/store";
import { eventListSlice } from "../store/events.slice";

export const fetchEventsAction = () => async (
    dispatch: AppDispatch,
    _: AppGetState,
    dependencies: Dependencies
) => {
    try {
        dispatch(eventListSlice.actions.fetchEventsLoading());
        const result = await dependencies.fetchEvents.fetch();
        dispatch(eventListSlice.actions.fetchEventsSuccess(result));
    } catch (error) {
        let message = "Une erreur est survenue";
        if (error instanceof Error) {
            message = error.message;
        }
        dispatch(eventListSlice.actions.fetchEventsError(message));
    }
}