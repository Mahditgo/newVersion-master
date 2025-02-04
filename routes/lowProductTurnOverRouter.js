const {Router} = require('express');
const lowTurnOverProductCn = require('./../controllers/lowProductTurnOverController')
const router = Router();

router.get('/:reportId', lowTurnOverProductCn.getLowChangeItems);

module.exports = router;