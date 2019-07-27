const {
    Router
} = require("express");
const router = Router();

const Sequelize = require('sequelize');
const {
    cart
} = require("../sequelize");
const Op = Sequelize.Op;

// for get cart
router.get("/", (req, res) => {
    cart.findAll()
        .then(result => {
            res.json(result).status(200);
        })
        .catch(err => {
            res.json({
                error: JSON.stringify(err)
            }).status(400);
        });
});
router.get("/:userid", (req, res) => {
    cart
        .findAll({
            where: {
                userid: req.params.userid
            }
        })
        .then(result => {
            res.json(result).status(200);
        })
        .catch(err => {
            res.json({
                error: JSON.stringify(err)
            }).status(400);
        });
});

router.delete('/:userid/:catid', (req, res) => {
    return cart.destroy({
        where: {
            userid: req.params.userid,
            catid: req.params.catid
        }
    }).then((cart) => {
        res.json(cart).status(200);
    }).catch((err) => {
        res.json({
            "error": JSON.stringify(err)
        }).status(400);
    });
});

router.post("/", (req, res) => {
    cart
        .findAll({
            where: {
                userid:req.body.userid,
                catid:req.body.catid
            }
        })
        .then(result => {
            if (result.length > 0) {
                res.json({
                    error: "duplicate value error"
                });
            } else {
                let obj = new cart();
                obj.userid=req.body.userid
                obj.catid=req.body.catid
                return obj
                    .save()
                    .then(cart => {
                        res.json(cart).status(200);
                    })
                    .catch(err => {
                        
                        res.json({
                            error: err
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



module.exports = router;