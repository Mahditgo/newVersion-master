const { Router } = require('express');
const upload = require('../middleswares/upload');
const toolsDetailsController = require('./../controllers/toolsDetailsController');
const router = Router();

router.post('/', upload.single('file'), toolsDetailsController.createToolsDetails);
router.get('/:reportId', toolsDetailsController.getToolsDetails);
router.delete('/:id',   toolsDetailsController.deleteTools);
router.delete('/:id/items/:itemId', toolsDetailsController.deleteToolsRow);



module.exports = router;