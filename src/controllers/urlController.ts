import { NextFunction, Request, Response } from "express";
import { UrlService } from "../services";

export class UrlController {
    shortenUrl = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const urlService = new UrlService();
            const response = await urlService.shortenUrl(req.body.url, req.body.expirationHours);
            res.json(response);
        } catch(error) {
            console.log("Error in UrlController.shortenUrl", error);
            next(error);
        }
    }

    getFullUrl = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const urlService = new UrlService();
            const response = await urlService.getFullUrl(req.body.shortUrl);
            res.json(response);
        } catch(error) {
            next(error);
        }
    }
}