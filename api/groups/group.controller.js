const { 
    createGroup, 
    deleteAllGroups, 
    getGroupById,
    getGroupStudentsByName, 
    getAllGroups
} = require("./group.service");

module.exports = {
    createGroup: (req, res) => {
        const body = req.body;

        createGroup(body, (err, results) => {
            if (err) return res.status(500).json({ success: 0, message: "DB connection error!" });
            return res.status(200).json({ success: 1, results: results });
        });
    },
    getGroupById: (req, res) => {
        const id = req.params.id;
        getGroupById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Запись не найдена"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    getGroupStudentsByName: (req, res) => {
        const name = req.params.name;
        getGroupStudentsByName(name, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Запись не найдена"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    getAllGroups: (req, res) => {
        getAllGroups((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    deleteAllGroups: (req, res) => {
        const id = req.body.id;
        deleteAllGroups(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results.affectedRows) {
                return res.json({
                    success: 0,
                    message: "Запись не найдена",
                    data: results
                });
            }
            return res.json({
                success: 1,
                message: "Запись успешно удалена",
                data: results
            });
        })
    }
};