const { Router } = require('express');
const upload = require('../middleswares/upload');
const furnitureController = require('./../controllers/furnitureDetailsController');
const router = Router();

router.post('/', upload.single('file'), furnitureController.createFurnitureDetails);
router.get('/:reportId', furnitureController.getFurnitureDetails);
router.delete('/:id',   furnitureController.deleteFurniture)
router.delete('/:id/items/:itemId', furnitureController.deleteFurnitureRow);



module.exports = router;