const {Router} = require('express');
const getRateDifController = require('./../controllers/getRateDifferenceController')
// const { requireAuth } = require('./../middlewares/requireAuth')
const router = Router();

// router.use(requireAuth);
router.get('/:reportId', getRateDifController.getRateDifference);

module.exports = router;