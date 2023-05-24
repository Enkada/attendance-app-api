const pool = require("../../config/database");

module.exports = {
    createStudent: (data, callBack) => {
        pool.query(
            `INSERT INTO students(fullname, group_id) VALUES (?, ?)`,
            [
                data.fullname,
                data.group_id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getStudentById: (id, callBack) => {
        pool.query(
            `SELECT students.id, fullname, group_id, groups.name as \`group\` FROM students INNER JOIN groups ON groups.id = group_id WHERE students.id = ? `, 
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        );
    },
    getAllStudents: callBack => {
        pool.query(
            `SELECT students.id, fullname, group_id, groups.name as \`group\` FROM students INNER JOIN groups ON groups.id = group_id WHERE groups.id = group_id`, 
            [],
            (error, results, fields) => {
                
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    deleteAllStudents: (id, callBack) => {
        pool.query(
            `DELETE FROM students`, 
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