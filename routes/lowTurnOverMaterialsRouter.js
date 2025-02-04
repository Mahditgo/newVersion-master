const {Router} = require('express');
const lowTurnOverMaterialCn = require('./../controllers/lowTurnOverMaterialsControllers')
const router = Router();

router.get('/:reportId', lowTurnOverMaterialCn.getLowTurnMaterial);

module.exports = router;