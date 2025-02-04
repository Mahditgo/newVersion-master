const {Router} = require('express');
const otherGoodDiscrepancyController = require('./../controllers/otherGoodsDiscrepancyController')
const router = Router();

router.get('/:reportId', otherGoodDiscrepancyController.getotherGoodDiscrepancies);

module.exports = router;