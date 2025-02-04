const {Router} = require('express');
const insurancecoverageController = require('./../controllers/insurancecoverageController')
const router = Router();

router.post('/', insurancecoverageController.createInsurancecoverage);
router.get('/:reportId', insurancecoverageController.getinsurancecoverageDetails);
router.get('/:reportId', insurancecoverageController.getinsurancecoverageDetails);
router.delete('/:id', insurancecoverageController.deleteInsurancecoverage);
router.delete('/:id/items/:itemId', insurancecoverageController.deleteInsurancecoverageRow)


module.exports = router;