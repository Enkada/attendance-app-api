const router = require("express").Router();
const { 
    createPassageByStudentName, 
    getAllPassagesByStudentId, 
    getAllPassages,
    deleteAllPassages
} = require("./passage.controller");

//const { checkToken } = require("../../auth/token_validation");

router.post("/", createPassageByStudentName);
router.get("/:id", getAllPassagesByStudentId);
router.get("/", getAllPassages);
router.delete("/", deleteAllPassages);

module.exports = router;