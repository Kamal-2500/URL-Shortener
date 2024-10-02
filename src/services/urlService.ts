import { Url } from "../models";
import { UrlUtils, BadRequestError, NotFoundError, GoneError } from "../utils";
import { configs } from "../configs";
import { IUrl, BaseResponse } from "../interfaces";

export class UrlService {
    shortenUrl = async (fullUrl: string, expirationHour: number): Promise<BaseResponse & IUrl> => {
        if (UrlUtils.isValid(fullUrl)) {
            const expiresIn = new Date();
            expiresIn.setHours(expiresIn.getHours() + expirationHour || 24);

            const shortenUrlCode = Math.random().toString(36).slice(7);
            const shortenUrl = `${configs.shorten.baseUrl}/${shortenUrlCode}`;

            const newUrl = new Url({
                url: fullUrl,
                shortenUrl,
                expiresIn,
            });

            await newUrl.save();

            return {
                success: true,
                url: fullUrl,
                shortenUrl,
                expiresIn,
            };
        } else {
            throw new BadRequestError("Url is invalid.");
        }
    }

    getFullUrl = async(shortenUrl: string): Promise<BaseResponse & {fullUrl: string}> => {
        const url = await Url.findOne({shortenUrl});
        if(url) {
            if(new Date() > url.expiresIn) {
                await Url.updateOne({shortenUrl}, {$inc: {clicked: 1}});
                return {
                    success: true,
                    fullUrl: url.url
                }
            } else {
                throw new GoneError("Url is expired.");
            }
        }else {
            throw new NotFoundError("Url not found");
        }
    }
}