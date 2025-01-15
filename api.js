// import AlumniController

// import express
const express = require("express");

// membuat object router
const router = express.Router();
const AlumniController = require('../controllers/AlumniController');

// Routes for Alumni API
router.get('/alumni', AlumniController.index); // Get All Resource
router.post('/alumni', AlumniController.store); // Add Resource
router.put('/alumni/:id', AlumniController.update); // Edit Resource
router.delete('/alumni/:id', AlumniController.destroy); // Delete Resource
router.get('/alumni/:id', AlumniController.show); // Get Detail Resource
router.get('/alumni/search/:name', AlumniController.search); // Search Resource by Name
router.get('/alumni/status/fresh-graduate', AlumniController.freshGraduate); // Get Fresh Graduate Resource
router.get('/alumni/status/employed', AlumniController.employed); // Get Employed Resource
router.get('/alumni/status/unemployed', AlumniController.unemployed); // Get Unemployed Resource


router.get("/", (req, res) => {
  res.send("Hello Alumni API Express");
});


module.exports = router;
