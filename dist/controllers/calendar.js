"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDragDropDiffDays = exports.updateDragDropInOneDay = exports.updateEvent = exports.deleteEvent = exports.createEvent = exports.getCurrentMonthData = void 0;
const Calendar_1 = require("../models/Calendar");
const getCurrentMonthData = (req, res, next) => {
    try {
        const startTime = req.query.startTime;
        const lastTime = req.query.lastTime;
        Calendar_1.Calendar.getCurrentMonthData(startTime, lastTime, (curweekdata) => {
            res.status(200).json(curweekdata);
        });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to get data" });
    }
};
exports.getCurrentMonthData = getCurrentMonthData;
const createEvent = (req, res, next) => {
    try {
        const newData = req.body;
        Calendar_1.Calendar.addNewEvent(newData, (newEvent) => {
            res.status(201).json(newEvent);
        });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to save data" });
    }
};
exports.createEvent = createEvent;
const deleteEvent = (req, res, next) => {
    try {
        const eventId = req.params.eventId;
        const date = req.params.date;
        Calendar_1.Calendar.onDeleteEvent(eventId, date);
        res.status(200).json({ message: "Event deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to delete data" });
    }
};
exports.deleteEvent = deleteEvent;
const updateEvent = (req, res, next) => {
    try {
        const updatedEvent = req.body;
        Calendar_1.Calendar.update(updatedEvent, () => {
            res.status(201).json({ message: "Updated successfully" });
        });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to update data" });
    }
};
exports.updateEvent = updateEvent;
const updateDragDropInOneDay = (req, res, next) => {
    try {
        const updatedEvents = req.body;
        Calendar_1.Calendar.updateOrderNumberInOneDay(updatedEvents, (isSuccess) => {
            if (isSuccess) {
                res.status(201).json({ message: "Updated successfully!" });
            }
            else {
                throw new Error("Failed to update");
            }
        });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to update data" });
    }
};
exports.updateDragDropInOneDay = updateDragDropInOneDay;
const updateDragDropDiffDays = (req, res, next) => {
    try {
        const updatedData = req.body;
        Calendar_1.Calendar.updateDragDropDiffDays(updatedData, (isSuccess) => {
            if (isSuccess) {
                res.status(201).json({ message: "Updated successfully!" });
            }
            else {
                throw new Error("Failed to update");
            }
        });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to update data" });
    }
};
exports.updateDragDropDiffDays = updateDragDropDiffDays;
