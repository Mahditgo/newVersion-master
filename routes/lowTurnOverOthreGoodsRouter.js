const {Router} = require('express');
const lowTurnOverotherGoodsCn = require('./../controllers/lowTurnOverOtherGoodsController')
const router = Router();

router.get('/:reportId', lowTurnOverotherGoodsCn.getLowTurnOtherGoods);

module.exports = router;