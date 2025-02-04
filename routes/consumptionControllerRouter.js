const {Router} = require('express');
const consumptionController = require('./../controllers/consuptionController');
// const { requireAuth } = require('./../middlewares/requireAuth')
const router = Router();

// router.use(requireAuth);
router.post('/:reportId', consumptionController.createConsuption);
router.get('/:reportId', consumptionController.getConsuptionControl);
router.delete('/:id', consumptionController.deletecompanyClaims);
router.delete('/items/:materialId', consumptionController.deleteConsumptionRow);
router.patch('/items/:materialId', consumptionController.updateMaterialItem);




module.exports = router;