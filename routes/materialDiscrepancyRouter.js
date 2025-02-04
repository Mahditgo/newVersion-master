const {Router} = require('express');
const materialDiscrepancyController = require('./../controllers/materialDiscrepancyController')
const router = Router();

router.get('/:reportId', materialDiscrepancyController.getMaterialDiscrepancies);

module.exports = router;