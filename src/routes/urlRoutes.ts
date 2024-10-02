import express from "express";
import { UrlController } from "../controllers";

export const urlRouter = express.Router();

const urlController = new UrlController();

urlRouter.post('/shorten', urlController.shortenUrl);

urlRouter.get('/', urlController.getFullUrl);