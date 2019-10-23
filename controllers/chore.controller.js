const db = require("../models");

module.exports = {
  //create a chore
  createChore: (req, res) => {
    //req.body needs a name, frequency,
    db.Chore.create(req.body)
      .then(choreData => {
        res.json(choreData);
      })
      .catch(err => {
        res.json(err);
      });
  },
  //update a chore
  updateChore: (req, res) => {
    db.Chore.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(update => {
        db.Chore.findOne({
          where: {
            id: req.params.id
          }
        })
          .then(chore => {
            res.json(chore);
          })
          .catch(err => {
            res.json(err);
          });
      })
      .catch(err => res.json(err));
  }
};
