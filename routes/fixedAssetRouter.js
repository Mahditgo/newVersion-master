const { Router } = require('express');
const upload = require('../middleswares/upload');
// const FixedAssetController = require('./../controllers/fixedAssetController');
const router = Router();

// router.post('/', upload.single('file'), FixedAssetController.uplaodFixedAsset);
// router.get('/:reportId', FixedAssetController.getFixedAsset);
// router.delete('/:id', FixedAssetController.deleteFixedAsset)
// router.delete('/:id/items/:itemId', FixedAssetController.deletePropertyRow);



module.exports = router;