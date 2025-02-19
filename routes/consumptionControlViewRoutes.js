const {Router} = require('express');
const consumptionViewController = require('./../controllers/consumptionControlViewController')
// const { requireAuth } = require('./../middlewares/requireAuth')
// router.use(requireAuth);
const router = Router();

router.get('/:reportId', consumptionViewController.getconsuptionControlView);

module.exports = router;