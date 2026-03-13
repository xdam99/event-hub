import type { AnalyticsModel } from "../model/analytics.model";
import type { AppDispatch, AppGetState } from "../../../store/store";
import type { Dependencies } from "../../../store/dependencies";
import { analyticsSlice } from "../store/analytics.slice";

export const sendAnalyticsAction = (event: AnalyticsModel.Event) => async (
    dispatch: AppDispatch,
    _: AppGetState,
    dependencies: Dependencies
) => {
    dispatch(analyticsSlice.actions.sendAnalyticsLoading());
    try {
        await dependencies.analyticsGateway.sendAnalytics(event);
        dispatch(analyticsSlice.actions.sendAnalyticsSuccess());
    } catch (error) {
        dispatch(analyticsSlice.actions.sendAnalyticsError(error instanceof Error ? error.message : String(error)));
    }
}