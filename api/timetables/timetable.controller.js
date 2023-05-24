const { 
    createTimetableByGroupName, 
    createTimetableClass, 
    deleteAllTimetables,
    deleteAllTimetableClasses,
    getTimetablesByGroupName,
    getAllTimetables,
    getTimetablesByGroupId
} = require("./timetable.service");

module.exports = {
    createTimetableByGroupName: (req, res) => {
        const body = req.body;

        createTimetableByGroupName(body, (err, results) => {
            if (err) return res.status(500).json({ success: 0, message: "DB connection error!", results: results, err: err });
            return res.status(200).json({ success: 1, results: results });
        });
    },
    createTimetableClass: (req, res) => {
        const body = req.body;
        body.id = req.params.id;
        createTimetableClass(body, (err, results) => {
            if (err) return res.status(500).json({ success: 0, message: "DB connection error!", results: results, err: err });
            return res.status(200).json({ success: 1 });
        });
    },
    getTimetablesByGroupName: (req, res) => {
        const name = req.params.name;
        getTimetablesByGroupName(name, (err, results) => {
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
    getTimetablesByGroupId: (req, res) => {
        const id = req.params.id;
        getTimetablesByGroupId(id, (err, results) => {
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
    getAllTimetables: (req, res) => {
        getAllTimetables((err, results) => {
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
        });
    },
    deleteAllTimetables: (req, res) => {
        deleteAllTimetables((err, results) => {
            if (err) return;
            deleteAllTimetableClasses((err, results) => {
                if (err) return;
                if (!results.affectedRows) return res.json({ success: 0, message: "Запись не найдена", data: results });
                return res.json({ success: 1, message: "Запись успешно удалена", data: results });
            })
        })
    }
};