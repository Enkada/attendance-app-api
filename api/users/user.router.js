const router = require("express").Router();

const { 
    createUser, 
    updateUser, 
    deleteUser, 
    getUserById, 
    getUsers,
    login,
    getAllTeachersGroups,
    getTeacherGroups,
    setTeacherGroup,
    removeTeacherGroup,
    removeAllTeacherGroup
} = require("./user.controller");

//const { checkToken } = require("../../auth/token_validation");

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.patch("/", updateUser);
router.delete("/", deleteUser);

router.get("/all-groups/:amogus", getAllTeachersGroups);
router.get("/groups/:id", getTeacherGroups);
router.delete("/groups", removeTeacherGroup);
router.delete("/groups/all", removeAllTeacherGroup);
router.post("/groups", setTeacherGroup);

router.post("/login", login);

module.exports = router;