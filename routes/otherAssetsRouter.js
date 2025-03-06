const { Router } = require('express');
const upload = require('../middleswares/upload');
const otherAssetsDetailsController = require('./../controllers/OtherAssetsDetailsController');
const router = Router();

router.post('/', upload.single('file'), otherAssetsDetailsController.createOtherAssetsDetails);
router.get('/:reportId', otherAssetsDetailsController.getOtherAssetsDetails);
router.delete('/:id',   otherAssetsDetailsController.deleteOtherAssets)
router.delete('/:id/items/:itemId', otherAssetsDetailsController.deleteOtherAssetsRow);



module.exports = router;