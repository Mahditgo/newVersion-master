const { Router } = require('express');
const upload = require('../middleswares/upload');
const facilitiesController = require('./../controllers/facilitiesDetailsController');
const router = Router();

router.post('/', upload.single('file'), facilitiesController.createFacilitesDetails);
router.get('/:reportId',                facilitiesController.getFacilitiesDetails);
router.delete('/:id',                   facilitiesController.deleteFacilites)
router.delete('/:id/items/:itemId',     facilitiesController.deleteFacilitesRow);



module.exports = router;