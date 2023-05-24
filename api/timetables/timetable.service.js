const pool = require("../../config/database");

module.exports = {
    createTimetableByGroupName: (data, callBack) => {
        pool.query(
            `INSERT INTO timetable(group_id, date) VALUES ((SELECT id FROM groups WHERE name = ?), ?)`,
            [
                data.group,
                data.date
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    createTimetableClass: (data, callBack) => {
        pool.query(
            `INSERT INTO timetable_classes(timetable_id, \`index\`, class) VALUES (?, ?, ?)`,
            [
                data.id,
                data.index,
                data.class
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getTimetablesByGroupName: (name, callBack) => {
        pool.query(
            `SELECT date, \`index\`, class FROM timetable 
            INNER JOIN timetable_classes ON timetable_id = timetable.id
            WHERE group_id = (SELECT id FROM groups WHERE name = ?)
            ORDER BY date, \`index\``, 
            [name],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getTimetablesByGroupId: (id, callBack) => {
        pool.query(
            `SELECT date, \`index\`, class FROM timetable 
            INNER JOIN timetable_classes ON timetable_id = timetable.id
            WHERE group_id = ?
            ORDER BY date, \`index\``, 
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getAllTimetables: (callBack) => {
        pool.query(
            `SELECT * FROM timetable`, 
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    deleteAllTimetables: (callBack) => {
        pool.query(
            `DELETE FROM timetable`, 
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    deleteAllTimetableClasses: (callBack) => {
        pool.query(
            `DELETE FROM timetable_classes`, 
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