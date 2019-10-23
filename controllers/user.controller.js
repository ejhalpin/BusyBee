const db = require("../models");

module.exports = {
  //create a user
  createUser: (req, res) => {
    //req.body needs a unique name, email, token, and hive id
    db.User.create(req.body)
      .then(userData => {
        res.json(userData);
      })
      .catch(err => {
        res.json(err);
      });
  },
  //get a user by id
  getUser: (req, res) => {
    db.User.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        res.json(err);
      });
  },
  //update a user
  updateUser: (req, res) => {
    db.User.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(update => {
        db.User.findOne({
          where: {
            id: req.params.id
          }
        })
          .then(user => {
            res.json(user);
          })
          .catch(err => {
            res.json(err);
          });
      })
      .catch(err => res.json(err));
  }
};
