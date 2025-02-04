const {Router} = require('express');
const productionDiscrepancyController = require('./../controllers/productionDiscrepancyController')
const router = Router();

router.get('/:reportId', productionDiscrepancyController.getProductionDiscrepancies);

module.exports = router;