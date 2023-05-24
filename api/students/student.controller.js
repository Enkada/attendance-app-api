const { 
    createStudent, 
    deleteAllStudents, 
    getStudentById,
    getAllStudents
} = require("./student.service");

module.exports = {
    createStudent: (req, res) => {
        const body = req.body;

        createStudent(body, (err, results) => {
            if (err) return res.status(500).json({ success: 0, message: "DB connection error!" });
            return res.status(200).json({ success: 1 });
        });
    },
    getStudentById: (req, res) => {
        const id = req.params.id;
        getStudentById(id, (err, results) => {
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
    getAllStudents: (req, res) => {
        getAllStudents((err, results) => {
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
    deleteAllStudents: (req, res) => {
        const id = req.body.id;
        deleteAllStudents(id, (err, results) => {
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