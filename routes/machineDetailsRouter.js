const { Router } = require('express');
const upload = require('../middleswares/upload');
const machineDetailsController = require('./../controllers/machineDetailsController');
const router = Router();

router.post('/', upload.single('file'), machineDetailsController.createMachineDetails);
router.get('/:reportId', machineDetailsController.getMachingDetails);
router.delete('/:id',   machineDetailsController.deleteMachin)
router.delete('/:id/items/:itemId', machineDetailsController.deleteMachinRow);



module.exports = router;