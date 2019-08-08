const {
    Router
} = require("express");
const router = Router();

const Sequelize = require('sequelize');
const {
    signups
} = require("../sequelize");
const Op = Sequelize.Op;

router.post("/signup", (req, res) => {
    signups
        .findAll({
            where: {
                email: req.body.email
            }
        })
        .then(result => {
            if (result.length > 0) {
                res.json({
                    status: false,
                    message: 'Email is already exists.'
                });
            } else {
                let signup = new signups();
                signup.fullname = req.body.fullname;
                signup.email = req.body.email;
                signup.password = req.body.password;
                signup.role = req.body.role;
                return signup.save()
                    .then(user => {
                        res.json({
                            status: true,
                            data: user,
                            message: 'user registered sucessfully'
                        }).status(200);
                    })
                    .catch(err => {
                        res.json({
                            status: false,
                            error: JSON.stringify(err),
                            message: 'there are some error with query'
                        }).status(400);
                    });
            }
        })
        .catch(err => {
            res.json({
                error: JSON.stringify(err)
            }).status(400);
        });
});

router.post("/signin", (req, res) => {
    signups
        .findAll({
            where: {
                email: req.body.email
            }
        })
        .then(result => {
            if (result.length > 0) {
                if (req.body.password == result[0].password && req.body.role == result[0].role) {
                    res.json({
                        status: true,
                        user: result,
                        message: 'successfully authenticated'
                    }).status(200)
                } else {
                    res.json({
                        status: false,
                        message: "Email and password does not match"
                    }).status(400);
                }
            }
        })
        .catch(err => {
            res.json({
                status: false,
                message: "Email does not exits",
                error: JSON.stringify(err)
            }).status(400);
        });
});

module.exports = router;