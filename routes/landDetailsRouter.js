const { Router } = require('express');
const upload = require('../middleswares/upload');
const landDetailsController = require('./../controllers/landDetailsController');
const router = Router();

router.post('/', upload.single('file'), landDetailsController.createLandDetails);
router.get('/:reportId', landDetailsController.getLandDetails);
router.delete('/:id',   landDetailsController.delelteLandDetails)
router.delete('/:id/items/:itemId', landDetailsController.deleteLandDetailsRow);



module.exports = router;