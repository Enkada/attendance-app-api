const router = require("express").Router();
const { 
    createGroup, 
    deleteAllGroups, 
    getGroupById, 
    getGroupStudentsByName,
    getAllGroups
} = require("./group.controller");

//const { checkToken } = require("../../auth/token_validation");

router.post("/", createGroup);
router.get("/", getAllGroups);
router.get("/:name/students", getGroupStudentsByName);
router.get("/:id", getGroupById);
router.delete("/", deleteAllGroups);

module.exports = router;