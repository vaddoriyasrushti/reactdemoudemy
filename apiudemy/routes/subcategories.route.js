const {
    Router
} = require("express");
const router = Router();
const Sequelize = require('sequelize');
const {
    subcategories
} = require("../sequelize");
const Op = Sequelize.Op;
const path = require('path')
var multer = require('multer');
const Jimp = require('jimp');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

var upload = multer({
    storage: storage
});

var allupload = upload.fields([{
    name: 'topicimage',
    maxCount: 1
}, {
    name: 'videos',
    maxCount: 1
}]);

router.post('/', allupload, (req, res, next) => {
    let imagePath = path.join(__dirname, '../images/' + req.files.topicimage[0].filename);
    let thumbnailImagePath = path.join(__dirname, '../images/thumbnailImages/' + req.files.topicimage[0].filename);
    Jimp.read(imagePath)
        .then(result => {
            return result
                .resize(70, Jimp.AUTO) // resize
                .quality(100) // set JPEG quality
                .write(thumbnailImagePath); // save
        })
        .catch(err => {
            console.error(err);
        });
    req.body.topicimage = req.files.topicimage[0].filename
    req.body.videos = req.files.videos[0].filename
    console.log("body", req.body)
    return subcategories.create(req.body).then((subcat) => {

        res.json(subcat).status(200);
    }).catch((err) => {
        res.json({
            "error": JSON.stringify(err)
        }).status(400);
    });
});


router.put('/:id', allupload, (req, res, next) => {
    console.log("req.files", req.files.topicimage[0].filename);
    let imagePath = path.join(__dirname, '../images/' + req.files.topicimage[0].filename);
    let thumbnailImagePath = path.join(__dirname, '../images/thumbnailImages/' + req.files.topicimage[0].filename);
    Jimp.read(imagePath)
        .then(result => {
            return result
                .resize(70, Jimp.AUTO) // resize
                .quality(100) // set JPEG quality
                .write(thumbnailImagePath); // save
        })
        .catch(err => {
            console.error(err);
        });
    req.body.topicimage = req.files.topicimage[0].filename
    req.body.videos = req.files.videos[0].filename
    console.log("body", req.body)
    return subcategories.update(req.body,{where:{id:req.params.id}}).then((subcat) => {
        res.json(subcat).status(200);
    }).catch((err) => {
        res.json({
            "error": JSON.stringify(err)
        }).status(400);
    });
});
router.get("/", (req, res) => {
    subcategories.findAll()
        .then(result => {
            res.json(result).status(200);
        })
        .catch(err => {
            res.json({
                error: JSON.stringify(err)
            }).status(400);
        });
});

router.get("/id/:id", (req, res) => {
    subcategories
        .findAll({
            where: {
                id: req.params.id
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

router.get("/:catname", (req, res) => {
    subcategories
        .findAll({
            where: {
                catname: req.params.catname
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
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    return subcategories.destroy({
        where: {
            id
        }
    }).then((user) => {
        res.json(user).status(200);
    }).catch((err) => {
        res.json({
            "error": JSON.stringify(err)
        }).status(400);
    });
})
module.exports = router;