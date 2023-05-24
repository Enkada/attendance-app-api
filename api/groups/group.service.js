const pool = require("../../config/database");

module.exports = {
    createGroup: (data, callBack) => {
        pool.query(
            `INSERT INTO groups(name, year) VALUES (?, ?)`,
            [
                data.name,
                data.year
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getAllGroups: callBack => {
        pool.query(
            `SELECT * FROM groups`, 
            [],
            (error, results, fields) => {
                
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getGroupById: (id, callBack) => {
        pool.query(
            `SELECT * FROM groups WHERE id = ?`, 
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        );
    },
    getGroupStudentsByName: (name, callBack) => {
        pool.query(
            `SELECT * FROM students WHERE group_id = (SELECT id FROM groups WHERE name = ?)`, 
            [name],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    deleteAllGroups: (id, callBack) => {
        pool.query(
            `DELETE FROM groups`, 
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    }
};