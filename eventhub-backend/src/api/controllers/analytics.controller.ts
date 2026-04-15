import { NextFunction, Request, Response } from "express";
import { RecordAnalyticsCommand } from "../../application/commands/record-analytics.command";
import { GetAnalyticsQuery } from "../../application/queries/get-analytics.query";
import { MongoAnalyticsRepository } from "../../infrastructure/repositories/mongo-analytics-repository";


const analyticsRepository = new MongoAnalyticsRepository(); 
const recordAnalyticsCommand = new RecordAnalyticsCommand(analyticsRepository);
const getAnalyticsQuery = new GetAnalyticsQuery(analyticsRepository);

export const recordAnalytics = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        await recordAnalyticsCommand.execute(req.body);
        return res.jsonSuccess(null, 201);
    } catch (error) {
        next(error);
    }
};

export const getAnalytics = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        const analytics = await getAnalyticsQuery.execute();
        
        return res.jsonSuccess(analytics, 200); 
    } catch (error) {
        next(error);
    }
};