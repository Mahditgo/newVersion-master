const {Router} = require('express');
const furnitureController = require('./../controllers/getFurnitureDiscreption')
// const { requireAuth } = require('./../middlewares/requireAuth')
// router.use(requireAuth);
const router = Router();

router.get('/:reportId/:timeVar', furnitureController.getFurnitureDescription);

module.exports = router;