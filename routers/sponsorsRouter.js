const express = require('express');
const router = express.Router();
const sponsorsController = require('../controllers/sponsorsController');

router.get('/', sponsorsController.sponsors_list);
router.get('/:id', sponsorsController.sponsor_detail);
router.post('/', sponsorsController.sponsor_create);
router.put('/:id', sponsorsController.sponsor_update);
router.delete('/:id', sponsorsController.sponsor_delete)

module.exports = router;