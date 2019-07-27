const {
    Router
} = require("express");
const router = Router();

const Sequelize = require('sequelize');
const {
    subcatsname
} = require("../sequelize");
const Op = Sequelize.Op;

// for get categories
router.get("/", (req, res) => {
    subcatsname
        .findAll()
        .then(result => {
            res.json(result).status(200);
        })
        .catch(err => {
            res.json({
                error: JSON.stringify(err)
            }).status(400);
        });
});

router.post("/", (req, res) => {
    subcatsname
        .findAll({
            where: {
                subcategories: req.body.subcategories
            }
        })
        .then(result => {
            if (result.length > 0) {
                res.json({
                    error: "duplicate value error"
                });
            } else {
                let subcat = new subcatsname();
                subcat.catname = req.body.catname;
                subcat.subcategories = req.body.subcategories;
                return subcat
                    .save()
                    .then(subcategories => {
                        res.json(subcategories).status(200);
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

// router.put('/:id', (req, res) => {
//     console.log('put method execute');
//     let id = req.params.id;
//     categories
//         .findAll({
//             where: {
//                 categoriesname: req.body.categoriesname,
//                 id: {
//                     [Op.ne]: req.params.id
//                 }
//             }
//         })
//         .then(result => {
//             console.log('resule::', result);
//             if (result.length > 0) {
//                 res.json({
//                     error: "duplicate value error"
//                 });
//             } else {
//                 return categories.update(req.body, {
//                     where: {
//                         id
//                     }
//                 }).then((categories) => {
//                     res.json(categories).status(200);
//                 }).catch((err) => {
//                     res.json({
//                         "error": JSON.stringify(err)
//                     }).status(400);
//                 });
//             }
//         })
//         .catch((err) => {
//             res.json({
//                 "error": JSON.stringify(err)
//             }).status(400);
//         });
// });

// router.delete('/:id', (req, res) => {
//     let id = req.params.id;
//     return categories.destroy({
//         where: {
//             id
//         }
//     }).then((user) => {
//         res.json(user).status(200);
//     }).catch((err) => {
//         res.json({
//             "error": JSON.stringify(err)
//         }).status(400);
//     });
// })
module.exports = router;