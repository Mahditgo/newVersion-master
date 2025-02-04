const {Router} = require('express');
const discrepanciesController = require('./../controllers/discrepancyController')
const router = Router();

router.get('/:reportId', discrepanciesController.getProductDiscrepancies);

module.exports = router;

