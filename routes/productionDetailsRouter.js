const { Router } = require('express');
const upload = require('./../middleswares/upload')
const productionController = require('./../controllers/productionsDetailsController');
const router = Router();

router.post('/',upload.single('file') , productionController.uplaodProductions);
router.get('/:reportId', productionController.getproductionDetails);
router.delete('/:id' , productionController.deleteProductionDetails);
router.delete('/:id/items/:itemId', productionController.deleteProductionsRow);



module.exports = router;