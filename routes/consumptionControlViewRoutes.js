const {Router} = require('express');
const consumptionViewController = require('./../controllers/consumptionControlViewController')
const { requireAuth } = require('./../middlewares/requireAuth')
const router = Router();

router.use(requireAuth);
router.get('/:reportId', consumptionViewController.getconsuptionControlView);

module.exports = router;