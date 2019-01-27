const express = require('express');
const router = express.Router();
const profilesController = require('../controllers/profilesController');

router.get('/', profilesController.profiles_list);
router.get('/:id', profilesController.profile_detail);
router.post('/', profilesController.profile_create);
router.put('/:id', profilesController.profile_update);
router.delete('/:id', profilesController.profile_delete)

module.exports = router;