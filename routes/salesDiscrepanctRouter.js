const {Router} = require('express');
const saleDiscrepancyController = require('./../controllers/saleDiscrepancyController')
const router = Router();

router.get('/:reportId', saleDiscrepancyController.getsalesDiscrepancies);

module.exports = router;