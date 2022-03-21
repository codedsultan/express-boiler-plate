module.exports = app => {
    const samples = require("../controllers/sample.controller.js");
    var router = require("express").Router();
    // Create a new sample
    router.post("/", samples.create);
    // Retrieve all samples
    router.get("/", samples.findAll);
    // Retrieve all published samples
    router.get("/published", samples.findAllPublished);
    // Retrieve a single sample with id
    router.get("/:id", samples.findOne);
    // Update a sample with id
    router.put("/:id", samples.update);
    // Delete a sample with id
    router.delete("/:id", samples.delete);
    // Create a new sample
    router.delete("/", samples.deleteAll);
    app.use('/api/samples', router);
  };