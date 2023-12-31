var express = require('express');
var router = express.Router();
var validation= require('../middleware/validation')
var { findAll, createVoiture, displayUpdatevoiture, updateVoiture, deleteVoiture,recherche } = require('../services/voitureService')

router.get('/', findAll);
router.post('/create', createVoiture);
router.get('/update/:id', displayUpdatevoiture);
router.post('/update/:id', updateVoiture);
router.get('/delete/:id', deleteVoiture);
router.post('/recherche', recherche);

module.exports = router;
