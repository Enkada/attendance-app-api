const pool = require("../../config/database");

module.exports = {
    createUser: (data, callBack) => {
        pool.query(
            `INSERT INTO users(fullname, login, password, is_admin)
            values(?, ?, ?, 0)`,
            [
                data.fullname,
                data.login,
                data.password
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    setTeacherGroup: (data, callBack) => {
        pool.query(
            `INSERT INTO teachers_groups(teacher_id, group_id)
            values(?, ?)`,
            [
                data.teacher_id,
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
    removeTeacherGroup: (id, callBack) => {
        pool.query(
            `DELETE FROM teachers_groups WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    removeAllTeacherGroup: (callBack) => {
        pool.query(
            `DELETE FROM teachers_groups`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getTeacherGroups: (id, callBack) => {
        pool.query(
            `SELECT * FROM teachers_groups WHERE teacher_id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getAllTeachersGroups: callBack => {
        pool.query(
            `SELECT * FROM teachers_groups`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getUsers: callBack => {
        pool.query(
            `SELECT id, fullname, login, is_admin FROM users`, 
            [],
            (error, results, fields) => {
                
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getUserById: (id, callBack) => {
        pool.query(
            `SELECT id, fullname, login, is_admin FROM users WHERE id = ?`, 
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        );
    },
    getUserByLogin: (login, callBack) => {
        pool.query(
            `SELECT id, fullname, login, password, is_admin FROM users WHERE login = ?`, 
            [login],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        );
    },
    updateUser: (data, callBack) => {
        pool.query(
            `UPDATE users SET fullname = ?, login = ? WHERE id = ?`,
            [
                data.fullName,
                data.phone,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    deleteUser: (id, callBack) => {
        pool.query(
            `DELETE FROM users WHERE id = ?`, 
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