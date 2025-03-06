const { Router } = require('express');
const upload = require('../middleswares/upload');
const buildingController = require('./../controllers/buildingDetailsController');
const router = Router();

router.post('/', upload.single('file'), buildingController.createBuildingDetails);
router.get('/:reportId', buildingController.getBuildingDetails);
router.delete('/:id',   buildingController.deleteBuilding)
router.delete('/:id/items/:itemId', buildingController.deleteBuildingRow);



module.exports = router;