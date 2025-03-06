const {Router} = require('express');
const buildingController = require('./../controllers/getBuildingDiscreptionControler')
// const { requireAuth } = require('./../middlewares/requireAuth')
// router.use(requireAuth);
const router = Router();

router.get('/:reportId/:timeVar', buildingController.getBuildingDiscreption);

module.exports = router;