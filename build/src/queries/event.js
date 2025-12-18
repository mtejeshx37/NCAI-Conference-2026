"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetchEvents = "SELECT id, name, fee FROM events;";
const fetchEventName = "SELECT name from events WHERE id = $1";
const EventQueries = {
    fetchEvents,
    fetchEventName,
};
exports.default = EventQueries;
//# sourceMappingURL=event.js.map