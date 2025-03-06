const { Router } = require('express');
const upload = require('../middleswares/upload');
const carDetailsController = require('./../controllers/carDetailsController');
const router = Router();

router.post('/', upload.single('file'), carDetailsController.createCarDetails);
router.get('/:reportId', carDetailsController.getCarDetails);
router.delete('/:id',   carDetailsController.deleteCarDetails)
router.delete('/:id/items/:itemId', carDetailsController.deleteCarRow);



module.exports = router;