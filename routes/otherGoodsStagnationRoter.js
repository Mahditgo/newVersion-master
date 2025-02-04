const {Router} = require('express');
const otherGoodslStagnationController = require('./../controllers/otherGoodsStagnationController')
const router = Router();

router.get('/:reportId', otherGoodslStagnationController.getStagnationOtherGoods);

module.exports = router;