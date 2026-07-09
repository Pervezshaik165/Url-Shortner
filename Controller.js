import { nanoid } from 'nanoid';
import Url from './UrlModel.js';

export const UrlShortenerController = async (req, res) => {
    
    const { originalUrl } = req.body;

    if (!originalUrl) {
        return res.status(400).json({ "error": "OriginalUrl is required" });
    }
    const shortId = nanoid(8);
    const newUrl = await Url.create({
        originalUrl: originalUrl,
        shortId: shortId
    });

    res.status(201).json({ "message": "URL shortened successfully", "shortId": newUrl.shortId });
}

export const RedirectController = async (req, res) => {
    const { shortId } = req.params;
    const url = await Url.findOne({ shortId:shortId });

    if (!url) {
        return res.status(404).json({ "error": "URL not found" });
    }

    await Url.updateOne({ shortId: shortId }, { $inc: { visits: 1 } });

    res.redirect(url.originalUrl);
}

export const ShortUrlAnalyticsController = async (req, res) => {
    const { shortId } = req.params;
    const url = await Url.findOne({ shortId: shortId });
    const analytics = {
        originalUrl: url.originalUrl,
        shortId: url.shortId,
        visits: url.visits
    }
    res.status(200).json({ "message": "Analytics fetched successfully", "analytics": analytics });
}

export const getAllUrlsController = async (req, res) => {
    
    try {
        const urls = await Url.find({});
        if (!urls || urls.length === 0) {
            return res.status(404).json({ "error": "No URLs found" });
        }
        res.status(200).json({ "message": "All URLs fetched successfully", "urls": urls });
    } catch (error) {
        res.status(500).json({ "error": "Internal server error" });
    }
}