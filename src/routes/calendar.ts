import { Router } from "express";
import {
  getCurrentMonthData,
  createEvent,
  deleteEvent,
  updateEvent,
  updateDragDropInOneDay,
  updateDragDropDiffDays,
} from "../controllers/calendar";

const router: Router = Router();

router.get("/", getCurrentMonthData);
router.post("/createEvent", createEvent);
router.delete("/deleteEvent/:date/:eventId", deleteEvent);
router.put("/updateEvent", updateEvent);
router.put("/dragDropInOneDay", updateDragDropInOneDay);
router.put("/dragDropDiffDays", updateDragDropDiffDays);

export default router;
