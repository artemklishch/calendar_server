import { QueryMiddleware } from "../app";
import { Calendar } from "../models/Calendar";

export const getCurrentMonthData: QueryMiddleware = (req, res, next) => {
  try {
    const startTime = req.query.startTime as string;
    const lastTime = req.query.lastTime as string;
    Calendar.getCurrentMonthData(
      startTime,
      lastTime,
      (curweekdata: Calendar[]) => {
        res.status(200).json(curweekdata);
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Failed to get data" });
  }
};

export const createEvent: QueryMiddleware = (req, res, next) => {
  try {
    const newData = req.body;
    Calendar.addNewEvent(newData, (newEvent) => {
      res.status(201).json(newEvent);
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to save data" });
  }
};

export const deleteEvent: QueryMiddleware = (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const date = req.params.date;
    Calendar.onDeleteEvent(eventId, date);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete data" });
  }
};

export const updateEvent: QueryMiddleware = (req, res, next) => {
  try {
    const updatedEvent = req.body;
    Calendar.update(updatedEvent, () => {
      res.status(201).json({ message: "Updated successfully" });
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update data" });
  }
};

export const updateDragDropInOneDay: QueryMiddleware = (req, res, next) => {
  try {
    const updatedEvents = req.body;
    Calendar.updateOrderNumberInOneDay(updatedEvents, (isSuccess) => {
      if (isSuccess) {
        res.status(201).json({ message: "Updated successfully!" });
      } else {
        throw new Error("Failed to update");
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update data" });
  }
};

export const updateDragDropDiffDays: QueryMiddleware = (req, res, next) => {
  try {
    const updatedData = req.body;
    Calendar.updateDragDropDiffDays(updatedData, (isSuccess) => {
      if (isSuccess) {
        res.status(201).json({ message: "Updated successfully!" });
      } else {
        throw new Error("Failed to update");
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update data" });
  }
};
