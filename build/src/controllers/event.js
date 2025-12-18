"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const queries_1 = require("../queries");
const fetchEvents = async (_req, res) => {
    const client = await config_1.db.connect();
    try {
        const eventsData = await client.query(queries_1.Event.fetchEvents, []);
        console.log(eventsData);
        return res.status(200).json({
            status: "👍",
            data: eventsData.rows,
            message: "events fetched",
        });
    }
    catch (e) {
        console.error("Error at fetching events", e);
        return res.status(500).json({
            status: "👎",
            data: null,
            message: "Error at fetching events",
        });
    }
    finally {
        client.release();
    }
};
const EventControllers = {
    fetchEvents,
};
exports.default = EventControllers;
//# sourceMappingURL=event.js.map