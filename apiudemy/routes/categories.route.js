const {
  Router
} = require("express");
const router = Router();

const Sequelize = require('sequelize');
const {
  categories
} = require("../sequelize");
const Op = Sequelize.Op;

// for get categories
router.get("/", (req, res) => {
  console.log("get categoriesw")
  categories
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

router.get("/:id", (req, res) => {
  categories
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

router.post("/", (req, res) => {
  categories
    .findAll({
      where: {
        categoriesname: req.body.categoriesname
      }
    })
    .then(result => {
      if (result.length > 0) {
        res.json({
          error: "duplicate value error"
        });
      } else {
        let cat = new categories();
        cat.categoriesname = req.body.categoriesname;
        cat.categoriesicon = req.body.categoriesicon;
        return cat
          .save()
          .then(categories => {
            res.json(categories).status(200);
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

router.put('/:id', (req, res) => {
  console.log('put method execute');
  let id = req.params.id;
  categories
    .findAll({
      where: {
        categoriesname: req.body.categoriesname,
        id: {
          [Op.ne]: req.params.id
        }
      }
    })
    .then(result => {
      console.log('resule::', result);
      if (result.length > 0) {
        res.json({
          error: "duplicate value error"
        });
      } else {
        return categories.update(req.body, {
          where: {
            id
          }
        }).then((categories) => {
          res.json(categories).status(200);
        }).catch((err) => {
          res.json({
            "error": JSON.stringify(err)
          }).status(400);
        });
      }
    })
    .catch((err) => {
      res.json({
        "error": JSON.stringify(err)
      }).status(400);
    });
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  return categories.destroy({
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