const { 
    createUser, 
    getUserById, 
    deleteUser, 
    updateUser, 
    getUsers,
    getUserByLogin,
    setTeacherGroup,
    getTeacherGroups,
    removeTeacherGroup,
    getAllTeachersGroups
} = require("./user.service");

const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        createUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "DB connection error!"
                });
            }
            return res.status(200).json({
                success: 1
            });
        });
    },
    setTeacherGroup: (req, res) => {
        const body = req.body;

        setTeacherGroup(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "DB connection error!"
                });
            }
            return res.status(200).json({
                success: 1
            });
        });
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Не удалось получить пользователя по ID. Запись не найдена"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    getTeacherGroups: (req, res) => {
        const id = req.params.id;
        getTeacherGroups(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Не найдены группы преподавателя по ID. Запись не найдена"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
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
    getAllTeachersGroups: (req, res) => {
        getAllTeachersGroups((err, results) => {
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
    updateUser: (req, res) => {
        const body = req.body;
        //const salt = genSaltSync(10);
        //body.password = hashSync(body.password, salt);

        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results.affectedRows) {
                return res.json({
                    success: 0,
                    message: "Не удалось обновить пользвателя. Запись не найдена",
                    data: results
                });
            }
            return res.json({
                success: 1,
                message: "Информация обновлена успешно",
                data: results
            });
        });
    },
    deleteUser: (req, res) => {
        const id = req.body.id;

        deleteUser(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results.affectedRows) {
                return res.json({
                    success: 0,
                    message: "Не удалось удалить пользователя. Запись не найдена",
                    data: results
                });
            }
            return res.json({
                success: 1,
                message: "Запись успешно удалена",
                data: results
            });
        })
    },
    removeTeacherGroup: (req, res) => {
        const id = req.body.id;
        
        removeTeacherGroup(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results.affectedRows) {
                return res.json({
                    success: 0,
                    message: "Не удалось удалить группу преподавателя. Запись не найдена",
                    data: results
                });
            }
            return res.json({
                success: 1,
                message: "Запись успешно удалена",
                data: results
            });
        })
    },
    login: (req, res) => {
        const body = req.body;
        getUserByLogin(body.login, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Неверные данные",
                    data: results
                });
            }
            const compareResult = compareSync(body.password, results.password);
            if (compareResult) {
                results.password = undefined;
                const jsontoken = sign({ user: results }, "ADMIN_KEY", {
                    expiresIn: "1h"
                });
                return res.cookie('token', jsontoken).json({
                    success: 1,
                    token: jsontoken,
                    user: results
                });
            } else {
                return res.json({
                    success: 0,
                    message: "Неверные данные"
                });
            }            
        })
    },
};