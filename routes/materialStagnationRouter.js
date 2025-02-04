const {Router} = require('express');
const materialStagnationController = require('./../controllers/materialStagnationController')
const router = Router();

router.get('/:reportId', materialStagnationController.getStagnationMaterial);

module.exports = router;