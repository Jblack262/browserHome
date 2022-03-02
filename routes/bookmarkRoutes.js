//Express Router setup
const express = require('express');
const router = express.Router();

//Import Controllers
const { getAllObjects, getObject, createObject, updateObject, deleteAll, deleteObject} = require('../controllers/bookmarkControllers');

router.route('').get(getAllObjects).post(createObject).delete(deleteAll)
router.route('/:id').get(getObject).patch(updateObject).delete(deleteObject)

module.exports = router;