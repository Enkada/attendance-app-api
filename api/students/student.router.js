const router = require("express").Router();
const { 
    createStudent, 
    deleteAllStudents, 
    getStudentById,
    getAllStudents
} = require("./student.controller");

//const { checkToken } = require("../../auth/token_validation");

router.post("/", createStudent);
router.get("/:id", getStudentById);
router.get("/", getAllStudents);
router.delete("/", deleteAllStudents);

module.exports = router;