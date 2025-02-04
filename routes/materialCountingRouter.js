const { Router } = require('express');
const upload = require('./../middleswares/upload')
const materialCountingController = require('./../controllers/materialCountingControllre');
const router = Router();

router.post('/',upload.single('file') , materialCountingController.uplaodMaterialCounting);
router.get('/:reportId', materialCountingController.getmaterialCountingDetails);
router.delete('/:id' , materialCountingController.deleteMaterialCounting);
router.delete('/:id/items/:itemId', materialCountingController.deleteMaterialCountingRow);



module.exports = router;