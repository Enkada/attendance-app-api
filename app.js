require("dotenv").config();
const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const { verify } = require("jsonwebtoken");

//const userRouter = require("./api/users/user.router");
const groupRouter = require("./api/groups/group.router");
const studentRouter = require("./api/students/student.router");
const timetableRouter = require("./api/timetables/timetable.router");
const passageRouter = require("./api/passages/passage.router");
const userRouter = require("./api/users/user.router");

app.use(cors({
    credentials: true,
    origin: 'https://enkada.ru'
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/groups", groupRouter);
app.use("/api/students", studentRouter);
app.use("/api/timetables", timetableRouter);
app.use("/api/passages", passageRouter);
app.use("/api/users", userRouter);

app.get('/api/user', (req, res) => {
    const {token} = req.cookies;
    if (token) {
        verify(token, "ADMIN_KEY", {}, async (err, data) => {
            if (err) {
                res.json('EXPIRED');
                return;
            }
            
            res.json({id: data.user.id, fullname: data.user.fullname, login: data.user.login, is_admin: data.user.is_admin.data[0] == 1});
        });
    } else {
        res.json(null);
    }
});

app.post('/api/logout', (req,res) => {
    res.cookie('token', '').json(true);
});

app.listen(process.env.APP_PORT, () => {
    console.log("Running on! http://127.0.0.1:" + process.env.APP_PORT);
});