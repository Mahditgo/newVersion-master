const { Router } = require('express');
const upload = require('../middleswares/upload');
const materialController = require('./../controllers/materialDetailsController');
const router = Router();

router.post('/', upload.single('file'), materialController.uplaodMaterial);
router.get('/:reportId', materialController.getMaterialsDetails);
router.delete('/:id' , materialController.deleteMaterialDetails);
router.delete('/:id/items/:itemId', materialController.deleteMaterialRow);



module.exports = router;