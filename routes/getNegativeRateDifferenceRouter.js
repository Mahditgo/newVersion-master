const {Router} = require('express');
const getNegativeRateDifController = require('./../controllers/getNegativeDiffrenceController')
// const { requireAuth } = require('./../middlewares/requireAuth')
const router = Router();

// router.use(requireAuth);
router.get('/:reportId', getNegativeRateDifController.getNegativeRateDifference);

module.exports = router;