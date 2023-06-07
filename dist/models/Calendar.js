"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calendar = void 0;
const database_1 = require("../util/database");
const uuid_1 = require("uuid");
class Calendar {
    constructor(eventId, date, title, description, colors, orderNumber) {
        this.eventId = eventId;
        this.date = date;
        this.title = title;
        this.description = description;
        this.colors = colors;
        this.orderNumber = orderNumber;
        this.orderNumber = orderNumber;
    }
    static getCurrentMonthData(startDate, endDate, cb) {
        const db = (0, database_1.getDb)();
        const sql = `SELECT * FROM events WHERE date BETWEEN '${startDate}' AND '${endDate}';`;
        db.all(sql, (err, curweekdata) => {
            if (err) {
                console.error(err);
                throw "Error occured";
            }
            cb(curweekdata);
        });
    }
    static getEventsByDate(date, cb) {
        const db = (0, database_1.getDb)();
        const sql = `SELECT * FROM events WHERE date='${date}';`;
        db.all(sql, (err, events) => {
            if (err) {
                console.error(err);
                throw "Error occured";
            }
            cb(events);
        });
    }
    static addNewEvent(newData, cb) {
        // in order to define the orderNumber we firstly get existing events and then
        // assign to new event the last vaule plus 1
        // there is a restriction - we do not create over 3 events with the sme date
        Calendar.getEventsByDate(newData.date, (events) => {
            if (events.length === 3) {
                throw "Error occured";
            }
            // const orderNumber = events.length + 1;
            const newEvent = new Calendar((0, uuid_1.v4)(), newData.date, newData.title, newData.description, newData.colors, events.length);
            newEvent.save(() => {
                cb(newEvent);
            });
        });
    }
    save(cb) {
        const db = (0, database_1.getDb)();
        const values = [
            this.eventId,
            this.date,
            this.title,
            this.description,
            this.colors,
            this.orderNumber,
        ];
        const sql = `INSERT INTO events(eventId, date, title, description, colors, orderNumber) values(?,?,?,?,?,?);`;
        db.run(sql, values, (err) => {
            if (err) {
                console.error(err);
                throw "Error occured";
            }
            cb();
        });
    }
    static onDeleteEvent(eventId, date) {
        // whe we delete the event we have to update the 'orderNumber' in events, which still exist
        // for the future, because we again can create new event in that date and then it should
        // get the last 'orderNumber' plus one
        // in order to do it - we firstly get all events with that date - and if their number is more then one
        // we update 'orderNumber' property then
        // as there are only three possible options of values - we cover two options - the third option - doesn't need to update
        Calendar.getEventsByDate(date, (events) => {
            if (events.length === 1) {
                Calendar.delete(eventId);
            }
            else {
                Calendar.delete(eventId);
                Calendar.updateGroupEventsWhenDelete(eventId, events);
            }
        });
    }
    static delete(eventId) {
        try {
            const db = (0, database_1.getDb)();
            db.run("DELETE FROM events WHERE eventId=?", [eventId], function (err) {
                if (err) {
                    console.error(err);
                    throw "Error occured";
                }
            });
        }
        catch (err) {
            console.error("Failed to delete!", err);
        }
    }
    static updateGroupEventsWhenDelete(eventId, events) {
        const deletedEvent = events.find((event) => event.eventId === eventId);
        if (!deletedEvent) {
            throw "Error occured";
        }
        let updatedEvents = [];
        if (deletedEvent.orderNumber === 0) {
            updatedEvents = events
                .filter((event) => event.eventId !== eventId)
                .map((event) => {
                event.orderNumber = event.orderNumber - 1;
                return event;
            });
        }
        else if (deletedEvent.orderNumber === 1) {
            updatedEvents = events
                .filter((event) => event.eventId !== eventId)
                .map((event) => {
                if (event.orderNumber > 0) {
                    event.orderNumber = event.orderNumber - 1;
                }
                return event;
            });
        }
        const db = (0, database_1.getDb)();
        const sql = "UPDATE events SET orderNumber=? WHERE eventId=?";
        for (let i = 0; i <= updatedEvents.length - 1; i++) {
            db.run(sql, [updatedEvents[i].orderNumber, updatedEvents[i].eventId], (err) => {
                if (err) {
                    console.error(err);
                    throw "Error occured";
                }
            });
        }
    }
    static updateOrderNumberInOneDay(updatedEvents, cb) {
        Calendar.getEventsByDate(updatedEvents[0].date, (events) => {
            const db = (0, database_1.getDb)();
            const sql = "UPDATE events SET orderNumber=? WHERE eventId=?";
            let isSuccess = true;
            for (let i = 0; i <= events.length - 1; i++) {
                const updatedEvent = updatedEvents.find((e) => e.eventId === events[i].eventId);
                if (updatedEvent) {
                    db.run(sql, [updatedEvent.orderNumber, updatedEvent.eventId], (err) => {
                        if (err) {
                            console.error(err);
                            isSuccess = false;
                            throw "Error occured";
                        }
                    });
                }
            }
            cb(isSuccess);
        });
    }
    static updateDragDropDiffDays(updatedData, cb) {
        var _a;
        const db = (0, database_1.getDb)();
        const dragged_update_sql = "UPDATE events SET orderNumber=? WHERE eventId=?";
        const dropped_update_sql = "UPDATE events SET date=?, orderNumber=? WHERE eventId=?";
        // firstly we update dragged day events
        Calendar.getEventsByDate((_a = updatedData.draggedDay[0]) === null || _a === void 0 ? void 0 : _a.date, (draggedevents) => {
            let isSuccess = true;
            if (draggedevents.length) {
                for (let i = 0; i <= draggedevents.length - 1; i++) {
                    const updatedEvent = updatedData.draggedDay.find((e) => e.eventId === draggedevents[i].eventId);
                    if (updatedEvent) {
                        db.run(dragged_update_sql, [updatedEvent.orderNumber, updatedEvent.eventId], (err) => {
                            if (err) {
                                console.error(err);
                                isSuccess = false;
                                throw "Error occured";
                            }
                        });
                    }
                }
            }
            if (isSuccess) {
                // then we update day events where we dropped the event
                Calendar.getEventsByDate(updatedData.droppedDay[0].date, () => {
                    for (let i = 0; i <= updatedData.droppedDay.length - 1; i++) {
                        db.run(dropped_update_sql, [
                            updatedData.droppedDay[i].date,
                            updatedData.droppedDay[i].orderNumber,
                            updatedData.droppedDay[i].eventId,
                        ], (err) => {
                            if (err) {
                                console.error(err);
                                isSuccess = false;
                                throw "Error occured";
                            }
                        });
                    }
                    cb(isSuccess);
                });
            }
        });
    }
    static update(updatedEvent, cb) {
        const db = (0, database_1.getDb)();
        const data = [
            updatedEvent.date,
            updatedEvent.title,
            updatedEvent.description,
            updatedEvent.colors,
            updatedEvent.orderNumber,
            updatedEvent.eventId,
        ];
        const sql = "UPDATE events SET date=?, title=?, description=?, colors=?, orderNumber=? WHERE eventId=?";
        db.run(sql, data, (err) => {
            if (err) {
                console.error(err);
                throw "Error occured";
            }
            if (cb) {
                cb();
            }
        });
    }
}
exports.Calendar = Calendar;
