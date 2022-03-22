const db = require("../models");
const Sample = db.samples;
// Create and Save a new sample
exports.create = (req, res) => {
    // Validate request
    // console.log(req);
    if (!req.body.title) {
      res.status(400).send({ message: "Empty Content"});
      return;
    }
    // Create a sample
    const sample = new Sample({
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    });
    // Save sample in the database
    // const sample = new Sample({
    //   title: "tilte",
    //   description: "desc",
    //   published: false
    // });
    sample
      .save(sample)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the sample."
        });
      });
  };
// Retrieve all samples from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    Sample.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving samples."
        });
      });
  };
// Find a single sample with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Sample.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found sample with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving sample with id=" + id });
      });
  };
// Update a sample by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const id = req.params.id;
    Sample.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update sample with id=${id}. Maybe sample was not found!`
          });
        } else res.send({ message: "sample was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating sample with id=" + id
        });
      });
  };
// Delete a sample with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Sample.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete sample with id=${id}. Maybe sample was not found!`
          });
        } else {
          res.send({
            message: "sample was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete sample with id=" + id
        });
      });
  };
// Delete all samples from the database.
exports.deleteAll = (req, res) => {
    Sample.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} samples were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all samples."
        });
      });
  };
// Find all published samples
exports.findAllPublished = (req, res) => {
    Sample.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving samples."
        });
      });
  };