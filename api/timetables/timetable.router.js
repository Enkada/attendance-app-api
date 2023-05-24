const router = require("express").Router();
const { 
    createTimetableByGroupName, 
    createTimetableClass, 
    deleteAllTimetables,
    getTimetablesByGroupName,
    getAllTimetables,
    getTimetablesByGroupId
} = require("./timetable.controller");

//const { checkToken } = require("../../auth/token_validation");

router.post("/", createTimetableByGroupName);
router.post("/:id", createTimetableClass);
router.get("/", getAllTimetables);
router.get("/:name", getTimetablesByGroupName);
router.get("/group/:id", getTimetablesByGroupId);
router.delete("/", deleteAllTimetables);

module.exports = router;