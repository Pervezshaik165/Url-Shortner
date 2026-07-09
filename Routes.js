import express from "express";
import {UrlShortenerController,RedirectController,ShortUrlAnalyticsController,getAllUrlsController} from "./Controller.js";
const Urlrouter = express.Router();

Urlrouter.post("/shorten", UrlShortenerController);
Urlrouter.get("/all", getAllUrlsController);
Urlrouter.get("/analytics/:shortId", ShortUrlAnalyticsController);
Urlrouter.get("/:shortId", RedirectController);

export default Urlrouter;