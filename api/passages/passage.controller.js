const { 
    createPassageByStudentName, 
    getAllPassagesByStudentId, 
    getAllPassages,
    deleteAllPassages
} = require("./passage.service");

module.exports = {
    createPassageByStudentName: (req, res) => {
        const body = req.body;

        createPassageByStudentName(body, (err, results) => {
            if (err) return res.status(500).json({ success: 0, message: "DB connection error!", results: results, err: err });
            return res.status(200).json({ success: 1, results: results });
        });
    },
    getAllPassagesByStudentId: (req, res) => {
        const id = req.params.id;
        getAllPassagesByStudentId(id, (err, results) => {
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
    getAllPassages: (req, res) => {
        getAllPassages((err, results) => {
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
    deleteAllPassages: (req, res) => {
        deleteAllPassages((err, results) => {
            if (err) return;
            if (!results.affectedRows) return res.json({ success: 0, message: "Запись не найдена", data: results });
            return res.json({ success: 1, message: "Запись успешно удалена", data: results });
        })
    }
};