const {Router} = require('express');
const machineController = require('./../controllers/getMachinDescripancyController')
// const { requireAuth } = require('./../middlewares/requireAuth')
// router.use(requireAuth);
const router = Router();

router.get('/:reportId/:timeVar', machineController.getMachinDescripancy);

module.exports = router;