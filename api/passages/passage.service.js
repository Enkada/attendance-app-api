const pool = require("../../config/database");

module.exports = {
    createPassageByStudentName: (data, callBack) => {
        pool.query(
            `INSERT INTO passages(student_id, building, datetime, type) VALUES 
            ((SELECT id FROM students WHERE fullname = ?), ?, ?, ?)`,
            [
                data.student,
                data.building,
                data.datetime,
                data.type
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },    
    getAllPassagesByStudentId: (id, callBack) => {
        pool.query(
            `SELECT * FROM passages WHERE student_id = ? AND building NOT LIKE '%общ%' ORDER BY datetime`, 
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getAllPassages: (callBack) => {
        pool.query(
            `SELECT * FROM passages WHERE building NOT LIKE '%общ%' ORDER BY datetime`, 
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    deleteAllPassages: (callBack) => {
        pool.query(
            `DELETE FROM passages`, 
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    }
};